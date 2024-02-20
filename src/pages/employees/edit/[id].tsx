// ** MUI Imports
import { Grid, MenuItem, Select } from '@mui/material'
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
import { employeeApi } from 'src/apis/employeeApis'

const empSchema = z.object({
  firstName: z.string().trim().nonempty({ message: 'Required field!' }),
  lastName: z.string().trim().nonempty({ message: 'Required field!' }),
  email: z.string().email().nonempty({ message: 'Required field!' }),
  phone: z.coerce.number().min(10, 'Enter valid mobile number'),
  address: z.string().trim().nonempty({ message: 'Required field!' }),
  department: z.any()
})

type TypeEmpSchema = z.infer<typeof empSchema>

const EditEmployee = ({ empData }: any) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<TypeEmpSchema>({
    resolver: zodResolver(empSchema),
    defaultValues: {
      department:empData.employee.department,
      firstName:empData.employee.firstName,
      lastName:empData.employee.lastName,
      email:empData.employee.email,
      phone:empData.employee.phone,
      address:empData.employee.address
    }
  })

  const onSubmit = async (values: TypeEmpSchema) => {
    try {
      const response = await employeeApi.putEmployee(router.query.id, values)
      if (response.data.success) {
        toast.success(response.data.message)
        router.push(`/employees`)
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
        <Link href={`/employees`}>Employees</Link>
        <Typography>Edit</Typography>
      </Breadcrumbs>
      <Card>
        <CardHeader title='Employee Information' />
        <br />
        <Divider sx={{ m: '0 !important' }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={6} md={6}>
                <Select
                  style={{ color: 'black' }}
                  fullWidth
                  size='small'
                  defaultValue={[' ']}
                  {...register('department', { required: 'Please select type' })}
                  error={!!errors.department}
                >
                  <MenuItem value=' ' disabled>
                    - select department -
                  </MenuItem>
                  <MenuItem value={'veg'}>Veg</MenuItem>
                  <MenuItem value={'non-veg'}>Non-Veg</MenuItem>
                </Select>
                {errors.department && <p style={{ color: 'red', fontSize: 'small' }}></p>}
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  size='small'
                  fullWidth
                  label='First Name *'
                  {...register('firstName', { required: 'first name is required' })}
                  error={!!errors.firstName}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  size='small'
                  fullWidth
                  rows={4}
                  label='LastName *'
                  {...register('lastName', { required: 'Last name is required' })}
                  error={!!errors.lastName}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  size='small'
                  fullWidth
                  rows={4}
                  label='Email *'
                  {...register('email', { required: 'Last name is required' })}
                  error={!!errors.email}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  size='small'
                  fullWidth
                  rows={4}
                  label='Phone *'
                  {...register('phone', { required: 'Last name is required' })}
                  error={!!errors.phone}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  size='small'
                  fullWidth
                  rows={4}
                  label='Address *'
                  multiline
                  {...register('address', { required: 'Last name is required' })}
                  error={!!errors.address}
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

export async function getServerSideProps({ query }: any) {
  const empData = await employeeApi.getEmployeeById(query.id)

  return { props: { empData: empData.data } }
}

export default EditEmployee
