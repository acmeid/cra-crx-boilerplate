import axios from 'axios'

// const baseUrl = '//192.168.0.206:1317'
const baseUrl = '//192.168.0.206:1317'
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
})

instance.interceptors.response.use(
  (response) => {
    // response.data = toCamelCase(response.data)
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(
  (config) => {
    // config.data = toSnackCase(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
