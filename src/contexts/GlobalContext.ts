import { Dispatch, SetStateAction, createContext } from 'react';
import {
  IAuthProps,
  IFacebookOAuth,
  IGoogleOAuth,
  IModalReservations,
  IResult,
  IStorageState,
  IUser,
} from '../interfaces/index';

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
  isOpenCreateEnvironmentModal: boolean;
  setIsOpenCreateEnvironmentModal: Dispatch<SetStateAction<boolean>>;
  isOpenConfirmSignoutModal: boolean;
  setIsOpenConfirmSignoutModal: Dispatch<SetStateAction<boolean>>;
  isReservationModal: IModalReservations | undefined;
  setIsReservationModal: Dispatch<SetStateAction<IModalReservations | undefined>>;
  isOpenApproveReservationModal: boolean;
  setIsOpenApproveReservationModal: Dispatch<SetStateAction<boolean>>;
  isOpenDisapproveReservationModal: boolean;
  setIsOpenDisapproveReservationModal: Dispatch<SetStateAction<boolean>>;
  isOpenCancelReservationModal: boolean;
  setIsOpenCancelReservationModal: Dispatch<SetStateAction<boolean>>;
  isMyselfData: IUser | null;
  setIsMyselfData: Dispatch<SetStateAction<IUser | null>>;
  isRemainingSeconds: number | undefined;
  setIsRemaingSeconds: Dispatch<SetStateAction<number | undefined>>;
  signinFacebookOauth: (credential: IFacebookOAuth) => Promise<IResult>;
  signinGoogleOauth: (credential: IGoogleOAuth) => Promise<IResult>;
  signin: (credential: IAuthProps) => Promise<IResult>;
  signout: () => void;
  getUserData: () => void;
  formatDate: (date: string) => string;
  handleInputErros: (e: any) => void;
  handleInputErrosClean: (e: any) => void;
}

export const GlobalContext: React.Context<GlobalContextProps> = createContext<GlobalContextProps | any>(null);
