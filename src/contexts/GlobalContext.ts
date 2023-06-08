import { Dispatch, SetStateAction, createContext } from 'react';
import { IAuthProps } from '../interfaces/index';

interface StorageState<T> {
  state: T;
  set: (newValue: T) => void;
  remove: () => void;
}

export interface GlobalContextProps {
  token: StorageState<string>;
  setToken: Dispatch<SetStateAction<string>>;
  isAuthenticated: StorageState<boolean>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  isUser: boolean;
  setIsUser: Dispatch<SetStateAction<boolean>>;
  isOpenEditModal: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  isOpenDeleteModal: boolean;
  setOpenDeletModal: Dispatch<SetStateAction<boolean>>;
  isOpenCreateUserModal: boolean;
  setOpenCreateUserModal: Dispatch<SetStateAction<boolean>>;
  signin: (credentials: IAuthProps) => Promise<{ success: boolean; data: any }>;
  signout: () => void;
  formatDate: (date: string) => string;
}

export const GlobalContext = createContext<GlobalContextProps | any>(null);
