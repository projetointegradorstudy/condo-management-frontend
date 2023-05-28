export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IAuthProps {
  username: string;
  password: string;
}

export interface IDataElementProps {
  data: IEnvironment;
}

export interface IUser {
  id: string;
  avatar: string;
  name: string;
  username: string;
  password: string;
  role: Role;
  registered_at: string;
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
