import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { api, auth, getMyself } from '../services/api';
import { GlobalContext } from './GlobalContext';
import useStorage from '../utils/useStorage';
import { IAuthProps, IModalRequests, IResult, IUser, Iprops } from '../interfaces/index';

export function GlobalProvider({ children }: Iprops) {
  const [token, setToken, removeToken] = useStorage('token');
  const [isAuthenticated, setIsAuthenticated, removeIsAuthenticated] = useStorage('isAuthenticated');
  const [isNeedRefresh, setIsNeedRefresh] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeletModal] = useState<boolean>(false);
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState<boolean>(false);
  const [isOpenCreateEnvironmentModal, setIsOpenCreateEnvironmentModal] = useState<boolean>(false);
  const [isOpenConfirmSignoutModal, setIsOpenConfirmSignoutModal] = useState<boolean>(false);
  const [isRequestModal, setIsRequestModal] = useState<IModalRequests>();
  const [isOpenApproveRequestModal, setIsOpenApproveRequestModal] = useState<boolean>(false);
  const [isOpenDisapproveRequestModal, setIsOpenDisapproveRequestModal] = useState<boolean>(false);
  const [isOpenCancelRequestModal, setIsOpenCancelRequestModal] = useState<boolean>(false);
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
    navigate('/');
  }

  async function getUserData(): Promise<void> {
    await getMyself()
      .then((res) => {
        setIsMyselfData(res.data);
      })
      .catch((e) => {});
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
        isOpenDeleteModal,
        setIsOpenDeletModal,
        isOpenCreateUserModal,
        setIsOpenCreateUserModal,
        isOpenCreateEnvironmentModal,
        setIsOpenCreateEnvironmentModal,
        isOpenConfirmSignoutModal,
        setIsOpenConfirmSignoutModal,
        isRequestModal,
        setIsRequestModal,
        isOpenApproveRequestModal,
        setIsOpenApproveRequestModal,
        isOpenDisapproveRequestModal,
        setIsOpenDisapproveRequestModal,
        isOpenCancelRequestModal,
        setIsOpenCancelRequestModal,
        isMyselfData,
        setIsMyselfData,
        isRemainingSeconds,
        setIsRemaingSeconds,
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
