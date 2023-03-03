import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'https://booking-api-5d1g.onrender.com',
});
