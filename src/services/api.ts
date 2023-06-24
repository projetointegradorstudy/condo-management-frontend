import axios from 'axios';

import { IAuthProps, ICreateEnvironment, ICreateRequest, IEditEnvironment, IEditUser } from '../interfaces/index';

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` });

export async function auth(authprops: IAuthProps) {
  return api.post('/auth', authprops);
}

/** DASHBOARD-DATA */
export async function getCountUsers() {
  return api.get('/users/count');
}

export async function getCountEnvironments() {
  return api.get('/environments/count');
}

/** USER CONTEXT */
export async function getMyself() {
  return api.get('/users/myself');
}

export async function createUser(email: string) {
  return api.post('/users', { email });
}

export async function createUserPassword(token: string, createUserPasswordDto: Partial<IEditUser>) {
  return api.patch(`/users/${token}/create-password`, createUserPasswordDto);
}

export async function forgotUserPassword(email: string) {
  return api.patch(`/users/send-reset-email?email=${email}`);
}

export async function resetPassword(token: string, resetPassword: Partial<IEditUser>) {
  return api.patch(`/users/reset-password?token=${token}`, resetPassword);
}

export async function updateUser(updateDto: Partial<IEditUser>) {
  return api.patch(`/users/myself/update`, updateDto, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
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

export async function createEnvironment(createEnvironment: Partial<ICreateEnvironment>) {
  return api.post('/environments', createEnvironment, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function deleteEnvironment(id: string) {
  return api.delete(`/environments/${id}`);
}

export async function updateEnvironment(id: string, updateEnvironmentDto: Partial<IEditEnvironment>) {
  return api.patch(`/environments/${id}`, updateEnvironmentDto, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

/** ENV_ REQUEST CONTEXT */
export async function getEnvironmentRequests() {
  return api.get('/env-requests');
}

export async function getEnvRequestsbyUser() {
  return api.get('/env-requests/user');
}

export async function createEnvRequest(createRequestDto: Partial<ICreateRequest>) {
  return api.post('/env-requests', createRequestDto);
}
