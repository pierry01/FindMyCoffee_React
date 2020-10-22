import Axios from 'axios'

const API = Axios.create({ baseURL: 'http://localhost:3001/api/v1' })

export default API