import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:5000/api" })

instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    )
  },
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    )
  },
)

export default instance
