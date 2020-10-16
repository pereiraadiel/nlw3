import axios from 'axios';

const api = axios.create({
  baseURL: "https://orphanages.herokuapp.com"
});

export default api;