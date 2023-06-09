import axios from 'axios';
import { ICreateUser, IAuthProps } from '../interfaces/index';

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` });

export async function auth(authprops: IAuthProps) {
  return api.post('/auth', authprops);
}

/** USER CONTEXT */
export async function createUser(createUserDto: ICreateUser) {
  return api.post('/users', createUserDto);
}

export async function getUsers() {
  return api.get('/users');
}

export async function deleteUser(id: string) {
  return api.delete(`/users/${id}`);
}

/** ENVIRONMENT CONTEXT */
export async function getEnvironments() {
  return api.get('/environments');
}
