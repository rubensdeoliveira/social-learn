import axios from 'axios'
import { AXIOS_BASE_URL } from '../env.js'

const api = axios.create({
  baseURL: AXIOS_BASE_URL,
})

export default api
