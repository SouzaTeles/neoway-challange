import axios from "axios"
import router from '@/router'
import { authService } from '@/services/auth.js'

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authService.setUnauthenticated()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
