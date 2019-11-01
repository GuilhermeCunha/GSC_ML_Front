import axios from 'axios';
require('dotenv/config');


const api = axios.create({
    baseURL: process.env.REACT_API_BASE_URL,
});
console.log("BASEURL: " + process.env.REACT_API_BASE_URL);
export default api;