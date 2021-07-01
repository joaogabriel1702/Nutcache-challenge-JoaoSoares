import axios from 'axios';

const { REACT_APP_API_BASE_URL: apiBaseURL } = process.env;

const api = axios.create({
  baseURL: apiBaseURL
});

export default api;