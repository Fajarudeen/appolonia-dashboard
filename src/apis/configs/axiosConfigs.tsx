import axios from 'axios'
import { BaseUrl } from 'src/utils/BaseUrl'

// import authConfig from 'src/configs/auth'

// let headers = {}

// if (typeof window !== 'undefined') {
//   headers = {
//     Authorization: 'bearer ' + Cookies.get('accessToken')
//   }
// }

export const axiosClient = axios.create({
  baseURL: BaseUrl,

//   headers: headers
})

export default axiosClient
