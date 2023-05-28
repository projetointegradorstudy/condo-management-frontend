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
  signin: (credentials: IAuthProps) => Promise<{ success: boolean; data: any }>;
  signout: () => void;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);
