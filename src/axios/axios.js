import axios from 'axios'

const instance = axios.create({
    //baseURL: 'http://localhost:8000/api/v1'
    baseURL: process.env.REACT_APP_API_URL
});

export default instance;