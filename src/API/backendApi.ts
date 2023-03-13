import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'https://booking-api-5d1g.onrender.com/api/v1',
  // baseURL: 'http://192.168.1.10/api/v1',
});
