import Axios from 'axios'

const API = Axios.create({ baseURL: 'https://jpierry-find-my-coffee.herokuapp.com/api/v1' })

export default API