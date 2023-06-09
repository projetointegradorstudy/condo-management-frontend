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

export interface IDeleteModal {
  id: string;
  name: string;
}

export const createUserMessages: { [key: string]: string } = {
  'user created successfully': 'Email cadastrado com sucesso.',
  'This email exist on our databases, an email with confirmate instructions will be sent':
    'Email previamente cadastrado, instruções serão enviadas para cadastro de senha.',
  "There's an email conflict": 'Email já existe.',
  'email must be valid': 'Email deve ser válido.',
};

export const deleteMessages: { [key: string]: string } = {
  'User deleted successfully': 'Usuário apagado.',
  'Not Found': 'Já excluido.',
  'Validation failed (uuid is expected)': 'ID inválido.',
};

export const loginMessages: { [key: string]: string } = {
  'Wrong email': 'Email e senha incorretos.',
};
