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
  isNeedRefresh: boolean;
  setIsNeedRefresh: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  isUser: boolean;
  setIsUser: Dispatch<SetStateAction<boolean>>;
  isOpenEditModal: boolean;
  setIsOpenEditModal: Dispatch<SetStateAction<boolean>>;
  isOpenDeleteModal: boolean;
  setIsOpenDeletModal: Dispatch<SetStateAction<boolean>>;
  isOpenCreateUserModal: boolean;
  setIsOpenCreateUserModal: Dispatch<SetStateAction<boolean>>;
  signin: (credentials: IAuthProps) => Promise<{ success: boolean; data: any }>;
  signout: () => void;
  formatDate: (date: string) => string;
  handleInputErros: (e: any) => void;
  handleInputErrosClean: (e: any) => void;
}

export const GlobalContext = createContext<GlobalContextProps | any>(null);
