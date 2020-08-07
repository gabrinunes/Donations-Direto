import axios from 'axios';

const api = axios.create({
    baseURL:'https://backend-donation.herokuapp.com'
})

export default api;