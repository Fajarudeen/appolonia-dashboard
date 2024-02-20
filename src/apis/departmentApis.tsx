import { axiosClient } from './configs/axiosConfigs'

export const departmentApi = {
  getDepartmentDataTable: async function ({  query }: {  query?: {} }) {
    const urlParams = new URLSearchParams(query ?? '')
    const response = await axiosClient.get(`departments/department-table?${urlParams}`)

    return response
  },
  getDepartmentById: async function (id: any, headers?: any) {
    const response = await axiosClient.get(`departments/view/${id}`, headers)

    return response.data
  },
  putDepartment: async function (id: any, body: any, headers?: any) {
    const response = await axiosClient.put(`departments/update/${id}`, body, headers)

    return response
  },
  postDepartment: async function (body: any) {
    const response = await axiosClient.post('departments/create', body)

    return response
  },
  deleteDepartment: async function (id: any, headers?: any) {
    const response = await axiosClient.delete(`departments/delete/${id}`, headers)

    return response
  }
}
