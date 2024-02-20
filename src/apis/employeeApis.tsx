import { axiosClient } from './configs/axiosConfigs'

export const employeeApi = {
  getEmployeeDataTable: async function ({ query }: { query?: {} }) {
    const urlParams = new URLSearchParams(query ?? '')
    const response = await axiosClient.get(`employees/employees-table?${urlParams}`)

    return response
  },
  getEmployeeById: async function (id: any, headers?: any) {
    const response = await axiosClient.get(`employees/view/${id}`, headers)

    return response.data
  },
  putEmployee: async function (id: any, body: any, headers?: any) {
    const response = await axiosClient.put(`employees/update/${id}`, body, headers)

    return response
  },
  postEmployee: async function (body: any) {
    const response = await axiosClient.post('employees/create', body)

    return response
  },
  deleteEmployee: async function (id: any, headers?: any) {
    const response = await axiosClient.delete(`employees/delete/${id}`, headers)

    return response
  }
}
