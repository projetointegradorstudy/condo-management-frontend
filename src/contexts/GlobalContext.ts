import { Dispatch, SetStateAction, createContext } from 'react';
import { authProps } from '../services/api';

interface StorageState<T> {
  state: T;
  set: (newValue: T) => void;
  remove: () => void;
}

interface GlobalContextProps {
  token: StorageState<string>;
  setToken: Dispatch<SetStateAction<string>>;
  isAuthenticated: StorageState<boolean>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  signin: (credentials: authProps) => Promise<{ success: boolean; data: any }>;
  signout: () => void;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);
