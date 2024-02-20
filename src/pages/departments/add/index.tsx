// ** MUI Imports
import { Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { departmentApi } from 'src/apis/departmentApis'

const empSchema = z.object({
  department: z.string().trim().nonempty({ message: 'Required field!' }),
  section: z.string().trim().nonempty({ message: 'Required field!' })
})

type TypeEmpSchema = z.infer<typeof empSchema>

const AddDepartment = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<TypeEmpSchema>({
    resolver: zodResolver(empSchema)
  })

  const onSubmit = async (values: TypeEmpSchema) => {
    try {
      const response = await departmentApi.postDepartment(values)
      if (response.data.success) {
        toast.success(response.data.message)
        router.push(`/departments`)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error submitting form:')
    }
  }

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link href={`/home`}>Home</Link>
        <Link href={`/departments`}>Department</Link>
        <Typography>Add</Typography>
      </Breadcrumbs>
      <Card>
        <CardHeader title='Department Details' />
        <br />
        <Divider sx={{ m: '0 !important' }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <TextField
                  size='small'
                  fullWidth
                  label='Deprtment Name *'
                  {...register('department', { required: 'required field' })}
                  error={!!errors.department}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  size='small'
                  fullWidth
                  rows={4}
                  label='Section *'
                  {...register('section', { required: ' required field' })}
                  error={!!errors.section}
                />
              </Grid>
            </Grid>
          </CardContent>
          {/* <Divider sx={{ m: '0 !important' }} /> */}
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' disabled={isSubmitting}>
              Add
            </Button>
            <Button size='large' type='reset' sx={{ mr: 2 }} color='error' variant='outlined' disabled={isSubmitting}>
              Reset
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  )
}

export default AddDepartment
