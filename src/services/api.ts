import axios from 'axios';
import { IAuthProps } from '../interfaces/index';

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` });

export async function auth(authprops: IAuthProps) {
  return api.post('/auth', authprops);
}

export async function getUsers() {
  return api.get('/users');
}

export async function getEnvironments() {
  return api.get('/environments');
}
