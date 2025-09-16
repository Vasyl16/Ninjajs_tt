import axios from 'axios';
import { config } from '../../config/config';

export const axiosBackendInstance = axios.create({
  baseURL: config.backend.url,
});
