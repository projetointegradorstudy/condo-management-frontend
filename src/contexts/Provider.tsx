import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { api, auth, authProps } from '../services/api';
import { GlobalContext } from './GlobalContext';
import useStorage from '../utils/useStorage';

export interface Iprops {
  children: ReactNode;
}

export function GlobalProvider({ children }: Iprops) {
  const [token, setToken, removeToken] = useStorage('token');
  const [isAuthenticated, setIsAuthenticated, removeIsAuthenticated] = useStorage('isAuthenticated');
  const [isAdmin, setIsAdmin] = useState(false);
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
    }
  }, [decodedToken, setIsAdmin]);

  async function signin(credentials: authProps) {
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
        signin,
        signout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
