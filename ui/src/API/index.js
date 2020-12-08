import Axios from 'axios';

const {
  REACT_APP_API = 'http://localhost:8080',
} = process.env;

export const baseURL = REACT_APP_API;

export const API = Axios.create({
  baseURL,
})

export const GetCookie = () => Object.fromEntries( [ document.cookie.split( '=' ) ] );
// const DeleteToken = () => document.cookie = `token=;path=/;max-age=-1`;
