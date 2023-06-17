import { Dispatch, SetStateAction, createContext } from 'react';
import { IAuthProps, IResult, IStorageState, IUser } from '../interfaces/index';

export interface GlobalContextProps {
  token: IStorageState<string>;
  setToken: Dispatch<SetStateAction<string>>;
  isAuthenticated: IStorageState<boolean>;
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
  isMyselfData: IUser | null;
  setIsMyselfData: Dispatch<SetStateAction<IUser | null>>;
  signin: (credentials: IAuthProps) => Promise<IResult>;
  signout: () => void;
  getUserData: () => void;
  formatDate: (date: string) => string;
  handleInputErros: (e: any) => void;
  handleInputErrosClean: (e: any) => void;
}

export const GlobalContext: React.Context<GlobalContextProps> = createContext<GlobalContextProps | any>(null);
