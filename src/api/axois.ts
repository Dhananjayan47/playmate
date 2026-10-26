import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  withCredentials: true,

});

api.interceptors.request.use(
    (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(customMessage));
  }
) 

export default api;