import Axios from 'axios';

export const baseURL = '/api';

export const API = Axios.create({
  withCredentials: true,
  baseURL,
})

export * from './User';
