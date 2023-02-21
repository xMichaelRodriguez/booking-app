import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'http://192.168.1.10:4000/api/v1',
});
