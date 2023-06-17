import axios from 'axios';
import { ICreateUser, IAuthProps, IEditUser } from '../interfaces/index';

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` });

export async function auth(authprops: IAuthProps) {
  return api.post('/auth', authprops);
}

/** USER CONTEXT */
export async function getMyself() {
  return api.get('/users/myself');
}

export async function createUser(createUserDto: ICreateUser) {
  return api.post('/users', createUserDto);
}

export async function createUserPassword(token: string, createUserPasswordDto: Partial<IEditUser>) {
  return api.patch(`/users/${token}/create-password`, createUserPasswordDto);
}

export async function getUsers() {
  return api.get('/users');
}

export async function adminUpdateUser(id: string, updateDto: Partial<IEditUser>) {
  return api.patch(`/users/admin/${id}/update`, updateDto);
}

export async function deleteUser(id: string) {
  return api.delete(`/users/${id}`);
}

/** ENVIRONMENT CONTEXT */
export async function getEnvironments() {
  return api.get('/environments');
}

export async function deleteEnvironment(id: string) {
  return api.delete(`/environments/${id}`);
}
