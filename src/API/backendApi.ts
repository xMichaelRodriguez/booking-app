import axios from 'axios';

export const backendApi = axios.create({
  // baseURL: 'https://api-booking-system.up.railway.app/api/v1',
  baseURL: 'http://192.168.1.10:3000/api/v1',
});
