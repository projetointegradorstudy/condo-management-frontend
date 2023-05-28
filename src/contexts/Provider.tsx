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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const { decodedToken } = useJwt(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !isAuthenticated) {
      setToken(token);
      setIsAuthenticated(isAuthenticated);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
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

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        isUser,
        setIsUser,
        signin,
        signout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
