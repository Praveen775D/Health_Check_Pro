// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://health-check-pro.onrender.com/api',
});

export default instance;
