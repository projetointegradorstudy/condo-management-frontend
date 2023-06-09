import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { api, auth } from '../services/api';
import { GlobalContext } from './GlobalContext';
import useStorage from '../utils/useStorage';
import { IAuthProps } from '../interfaces/index';

export interface Iprops {
  children: ReactNode;
}

export function GlobalProvider({ children }: Iprops) {
  const [token, setToken, removeToken] = useStorage('token');
  const [isAuthenticated, setIsAuthenticated, removeIsAuthenticated] = useStorage('isAuthenticated');
  const [isNeedRefresh, setIsNeedRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeletModal] = useState(false);
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
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
    } else if ((decodedToken as { user: { role: string } })?.user?.role === 'user') {
      setIsUser(true);
    }
  }, [decodedToken, setIsAdmin]);

  async function signin(credentials: IAuthProps) {
    const data = await auth(credentials)
      .then((res) => {
        api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        return { data: res.data, success: true } as { success: boolean; data: any };
      })
      .catch((e) => {
        return { data: e.response, success: false } as { success: boolean; data: any };
      });
    return data;
  }

  async function signout() {
    api.defaults.headers.Authorization = null;
    removeToken();
    removeIsAuthenticated();
    setIsAdmin(false);
    setIsUser(false);
    navigate('/');
  }

  function formatDate(date: string) {
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

  const handleInputErros = (e: any) => {
    const input: HTMLInputElement = e.target;
    input.setCustomValidity("It can't be empty");
    input.classList.add('field-error');
  };

  const handleInputErrosClean = (e: any) => {
    const input: HTMLInputElement = e.target;
    e.target.setCustomValidity('');
    e.target.classList.remove('field-error');
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
        signin,
        signout,
        formatDate,
        handleInputErros,
        handleInputErrosClean,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
