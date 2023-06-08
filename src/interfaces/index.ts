export enum Role {
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
  role: Role;
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
