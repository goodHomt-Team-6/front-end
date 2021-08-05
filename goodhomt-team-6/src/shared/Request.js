import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const api = axios.create({
  baseURL: `http://54.180.158.188/`,
});

export default api;
