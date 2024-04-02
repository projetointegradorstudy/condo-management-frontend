import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { api, auth, facebookOauth, getMyself, googleOauth, microsoftOauth } from '../services/api';
import { GlobalContext } from './GlobalContext';
import useStorage from '../utils/useStorage';
import {
  IAuthProps,
  IFacebookOAuth,
  IGoogleOAuth,
  IMicrosoftOAuth,
  IModalReservations,
  IResult,
  IUser,
  Iprops,
} from '../interfaces/index';

export function GlobalProvider({ children }: Iprops) {
  const [token, setToken, removeToken] = useStorage('token');
  const [isAuthenticated, setIsAuthenticated, removeIsAuthenticated] = useStorage('isAuthenticated');
  const [isNeedRefresh, setIsNeedRefresh] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenAccessibilityModal, setIsOpenAccessibilityModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeletModal] = useState<boolean>(false);
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState<boolean>(false);
  const [isOpenCreateEnvironmentModal, setIsOpenCreateEnvironmentModal] = useState<boolean>(false);
  const [isOpenConfirmSignoutModal, setIsOpenConfirmSignoutModal] = useState<boolean>(false);
  const [isReservationModal, setIsReservationModal] = useState<IModalReservations>();
  const [isOpenApproveReservationModal, setIsOpenApproveReservationModal] = useState<boolean>(false);
  const [isOpenDisapproveReservationModal, setIsOpenDisapproveReservationModal] = useState<boolean>(false);
  const [isOpenCancelReservationModal, setIsOpenCancelReservationModal] = useState<boolean>(false);
  const [isMyselfData, setIsMyselfData] = useState<IUser | null>(null);
  const [isRemainingSeconds, setIsRemaingSeconds] = useState<number>();
  const { decodedToken } = useJwt(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !isAuthenticated) {
      setToken(token);
      setIsAuthenticated(isAuthenticated);
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, [token, isAuthenticated]);

  useEffect(() => {
    if ((decodedToken as { user: { role: string } })?.user?.role === 'admin') {
      setIsAdmin(true);
      navigate('/dashboard-admin');
    } else if ((decodedToken as { user: { role: string } })?.user?.role === 'user') {
      setIsUser(true);
      navigate('/menu-user');
    }
  }, [decodedToken]);

  async function signinFacebookOauth(credential: IFacebookOAuth): Promise<IResult> {
    const result = await facebookOauth(credential)
      .then((res) => {
        setToken(res.data?.access_token);
        setIsAuthenticated(true);
        api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        return { result: true, message: 'Login succeed' };
      })
      .catch((e) => {
        return { result: false, message: e.response?.data.message };
      });
    return result;
  }

  async function signinGoogleOauth(credential: IGoogleOAuth): Promise<IResult> {
    const result = await googleOauth(credential)
      .then((res) => {
        setToken(res.data?.access_token);
        setIsAuthenticated(true);
        api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        return { result: true, message: 'Login succeed' };
      })
      .catch((e) => {
        return { result: false, message: e.response?.data.message };
      });
    return result;
  }

  async function signinMicrosoftOauth(credential: IMicrosoftOAuth): Promise<IResult> {
    const result = await microsoftOauth(credential)
      .then((res) => {
        setToken(res.data?.access_token);
        setIsAuthenticated(true);
        api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        return { result: true, message: 'Login succeed' };
      })
      .catch((e) => {
        return { result: false, message: e.response?.data.message };
      });
    return result;
  }

  async function signin(credentials: IAuthProps): Promise<IResult> {
    const result = await auth(credentials)
      .then((res) => {
        setToken(res.data?.access_token);
        setIsAuthenticated(true);
        api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        return { result: true, message: 'Login succeed' };
      })
      .catch((e) => {
        return { result: false, message: e.response?.data.message };
      });
    return result;
  }

  async function signout(): Promise<void> {
    api.defaults.headers.Authorization = null;
    removeToken();
    removeIsAuthenticated();
    setIsAdmin(false);
    setIsUser(false);
    setIsOpenConfirmSignoutModal(false);
    navigate('/');
  }

  async function getUserData(): Promise<void> {
    await getMyself()
      .then((res) => {
        setIsMyselfData(res.data);
      })
      .catch();
  }

  function formatDate(date: string): string {
    const locale = navigator.language || 'pt-BR';
    return Intl.DateTimeFormat(locale, {
      timeZone: 'America/Recife',
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  }

  const handleInputErros = (e: any): void => {
    const input: HTMLInputElement = e.target;
    input.setCustomValidity("It can't be empty");
    input.classList.add('field-error');
  };

  const handleInputErrosClean = (e: any): void => {
    const input: HTMLInputElement = e.target;
    input.setCustomValidity('');
    input.classList.remove('field-error');
  };

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        isNeedRefresh,
        setIsNeedRefresh,
        isAdmin,
        setIsAdmin,
        isUser,
        setIsUser,
        isOpenEditModal,
        setIsOpenEditModal,
        isOpenAccessibilityModal,
        setIsOpenAccessibilityModal,
        isOpenDeleteModal,
        setIsOpenDeletModal,
        isOpenCreateUserModal,
        setIsOpenCreateUserModal,
        isOpenCreateEnvironmentModal,
        setIsOpenCreateEnvironmentModal,
        isOpenConfirmSignoutModal,
        setIsOpenConfirmSignoutModal,
        isReservationModal,
        setIsReservationModal,
        isOpenApproveReservationModal,
        setIsOpenApproveReservationModal,
        isOpenDisapproveReservationModal,
        setIsOpenDisapproveReservationModal,
        isOpenCancelReservationModal,
        setIsOpenCancelReservationModal,
        isMyselfData,
        setIsMyselfData,
        isRemainingSeconds,
        setIsRemaingSeconds,
        signinFacebookOauth,
        signinGoogleOauth,
        signinMicrosoftOauth,
        signin,
        signout,
        getUserData,
        formatDate,
        handleInputErros,
        handleInputErrosClean,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
