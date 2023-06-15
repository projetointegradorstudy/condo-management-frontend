import { ReactElement } from 'react';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IAuthProps {
  email: string;
  password: string;
}

export interface IDataElementProps<T> {
  data: T;
}

export interface ICreateUser {
  email: string;
}

export interface IUser {
  id: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: Roles;
  is_active: boolean;
  partial_token: string;
  created_at: string;
  updated_at: string;
}

export interface IEnvironment {
  id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  capacity: string;
  created_at: string;
  updated_at: string;
}

export interface IDeleteModal {
  id: string;
  name: string;
}

export interface IEditUserModal {
  id: string;
  avatar: string;
  password: string;
  passwordConfirmation: string;
  created_at: string;
  role: Roles;
}

export interface IEditEnvironmentModal {
  name: string;
  description: string;
  status: string;
  image: string;
  capacity: string;
}

export const createUserMessages: { [key: string]: string } = {
  'User created successfully': 'Email cadastrado com sucesso.',
  'This email exist on our databases, an email with confirmate instructions will be sent':
    'Email previamente cadastrado, instruções serão enviadas para cadastro de senha.',
  "There's an email conflict": 'Email já existe.',
  'email must be valid': 'Email deve ser válido.',
};

export const deleteMessages: { [key: string]: string } = {
  'User deleted successfully': 'Usuário apagado com sucesso.',
  'Not Found': 'Já excluido.',
  'Validation failed (uuid is expected)': 'ID inválido.',
};

export const loginMessages: { [key: string]: string } = {
  'Wrong email': 'Email e senha incorretos.',
};

export interface IResultRequest {
  message: string;
  icon: ReactElement;
}
