import { api, auth, authProps } from '../services/api';
import { ReactNode } from 'react';
import { GlobalContext } from './GlobalContext';

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  // const [token, setToken] = use;
  async function login(credentials: authProps) {
    let success;

    const data = await auth(credentials)
      .then((res) => {
        success = true;
        api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        return res.data;
      })
      .catch((e) => {
        success = false;
        return e.response;
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        // token,
        // setToken,
        // isAuthenticated,
        // setIsAuthenticated,
        // isAdmin,
        // setIsAdmin,
        login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
