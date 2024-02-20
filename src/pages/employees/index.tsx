import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Card, IconButton, Tooltip, CardHeader, Button } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import DeleteConfirmationDialog from 'src/layouts/components/DeleteConfirmationDialogueBox'
import { employeeApi } from 'src/apis/employeeApis'

function ManageFaq() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [dialogId, setDialogId] = useState('')
  const [rows, setRows] = useState<any[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })

  const fetchTableData = useCallback(
    async () => {
      await employeeApi.getEmployeeDataTable({}).then(res => {
        setRows(res.data.data?.employees)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  )

  console.log('rows::', rows)

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])

  const deleteFaq = (id: any) => {
    setOpenDeleteDialog(true)
    setDialogId(id)
  }

  const deleteFaqData = async (id: any) => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true
    }

    try {
      const response = await employeeApi.deleteEmployee(id, {})
      toast.success(response?.data?.message)
      fetchTableData()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error('An error occurred.')
        }
      } else {
        toast.error('An unexpected error occurred.')
      }
      if (buttonRef.current) {
        buttonRef.current.disabled = false
      }
    } finally {
      setOpenDeleteDialog(false)
    }
  }

  const columns: GridColDef<any>[] = [
    {
      flex: 0.275,
      minWidth: 150,
      field: 'Employee_id',
      headerName: 'Emp.ID',
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params: any) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row._id}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.275,
      minWidth: 200,
      field: 'firstName',
      headerName: 'First Name',
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params: any) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.firstName}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.275,
      minWidth: 200,
      field: 'lastName',
      headerName: 'Last Name',
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params: any) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.lastName}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.275,
      minWidth: 250,
      field: 'departmant',
      headerName: 'Department',
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params: any) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.departmant}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.275,
      minWidth: 200,
      field: 'email',
      headerName: 'email',
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params: any) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.email}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 130,
      headerName: 'Actions',
      field: 'actions',
      sortable: false,
      disableColumnMenu: true,

      renderCell: ({ row }: { row: any }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Tooltip title='View'>
                <IconButton size='small' component={Link} href={`/view/${row.id}`}>
                  <Icon icon='raphael:view' fontSize={20} />
                </IconButton>
              </Tooltip> */}

          <Tooltip title='Delete'>
            <IconButton onClick={() => deleteFaq(row._id)} size='small'>
              <Icon icon='tabler:trash' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton size='small' component={Link} href={`/employees/edit/${row._id}`}>
              <Icon icon='tabler:edit' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link href={`/home`}>Home</Link>
        <Typography>Employees </Typography>
      </Breadcrumbs>
      <Card>
        <CardHeader
          title='Employee List'
          action={
            <div>
              <Button size='medium' variant='contained' component={Link} href={`/employees/add`}>
                Add Employee
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={rows || []}
          columns={columns}
          rowCount={0}
          getRowId={row => row._id}
          pagination
          sortingMode='server'
          paginationMode='server'
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[15, 50]}
          slotProps={{
            baseButton: {
              size: 'medium',
              variant: 'tonal'
            }
          }}
        />
      </Card>

      {openDeleteDialog && (
        <DeleteConfirmationDialog
          id={dialogId}
          buttonRef={buttonRef}
          name=''
          open={true}
          setOpen={setOpenDeleteDialog}
          deleteFunction={deleteFaqData}
        />
      )}
    </div>
  )
}

export default ManageFaq
