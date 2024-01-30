import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4444/'
    // baseURL: 'https://todomern-sk9q.onrender.com/'
})
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance