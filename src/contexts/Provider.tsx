import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import {
  api,
  auth,
  facebookOauth,
  getMyself,
  googleOauth,
  mfaAuth,
  microsoftOauth,
  twoFactorAuth,
} from '../services/api';
import { GlobalContext } from './GlobalContext';
import useStorage from '../utils/useStorage';
import {
  IAuthProps,
  IFacebookOAuth,
  IGoogleOAuth,
  IMfaAuthProps,
  IMfaOption,
  IMicrosoftOAuth,
  IModalReservations,
  IResult,
  IUser,
  Iprops,
} from '../interfaces/index';

export function GlobalProvider({ children }: Iprops) {
  const [token, setToken, removeToken] = useStorage('token');
  const [isAuthenticated, setIsAuthenticated, removeIsAuthenticated] = useStorage('isAuthenticated');
  const [isMfaAuthenticated, setIsMfaAuthenticated, removeIsMfaAuthenticated] = useStorage('isMfaAuthenticated');
  const [isSocialLogin, setIsSocialLogin, removeIsIsSocialLogin] = useStorage('isSocialLogin');
  const [email, setEmail, removeEmail] = useStorage('email');
  const [isNeedRefresh, setIsNeedRefresh] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isMfaEnabled, setIsMfaEnabled] = useState<boolean>(false);
  const [isOpenMfaModal, setIsOpenMfaModal] = useState<boolean>(false);
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
    api.defaults.headers.Authorization = `Bearer ${token}`;
    if (!token && !isAuthenticated) {
      setToken(token);
      setIsAuthenticated(isAuthenticated);
    }
    if (isMfaEnabled && !isMfaAuthenticated) setIsMfaAuthenticated(isMfaAuthenticated);
    if (!email) setEmail(email);
  }, [token, isAuthenticated]);

  useEffect(() => {
    const localDecodedToken = decodedToken as { user: { role: string; mfaOption: IMfaOption; email: string } };
    if (localDecodedToken?.user?.role === 'admin') {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setIsAdmin(true);
      setIsAuthenticated(true);
    } else if (localDecodedToken?.user?.role === 'user') {
      setIsUser(true);
      setEmail(localDecodedToken?.user?.email);
      if (
        (localDecodedToken?.user?.mfaOption.email || localDecodedToken?.user?.mfaOption.appAuthenticator) &&
        !isMfaAuthenticated &&
        !isSocialLogin
      ) {
        setIsMfaEnabled(true);
        setIsMfaAuthenticated(false);
        setIsOpenMfaModal(true);
        return;
      }
      setIsAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [decodedToken]);

  useEffect(() => {
    if (!isMyselfData && isAuthenticated) {
      getUserData();
      setIsNeedRefresh(true);
    }
  }, []);

  async function signinFacebookOauth(credential: IFacebookOAuth): Promise<IResult> {
    const result = await facebookOauth(credential)
      .then((res) => {
        setIsSocialLogin(true);
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
        setIsSocialLogin(true);
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
        setIsSocialLogin(true);
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
        return { result: true, message: 'Login succeed' };
      })
      .catch((e) => {
        return { result: false, message: e.response?.data.message };
      });
    return result;
  }

  async function mfaSignin(mfaAuthProps: IMfaAuthProps): Promise<IResult> {
    let result: IResult;
    if (isMyselfData?.mfaOption?.appAuthenticator) {
      result = await twoFactorAuth(mfaAuthProps)
        .then((res) => {
          setIsMfaAuthenticated(true);
          setIsOpenMfaModal(false);
          setIsAuthenticated(true);
          api.defaults.headers.Authorization = `Bearer ${res.data?.access_token}`;
          return { result: true, message: 'Login succeed' };
        })
        .catch((e) => {
          return { result: false, message: e.response?.data.message };
        });
    } else {
      result = await mfaAuth(mfaAuthProps)
        .then((res) => {
          setIsMfaAuthenticated(true);
          setIsOpenMfaModal(false);
          setIsAuthenticated(true);
          api.defaults.headers.Authorization = `Bearer ${res.data?.access_token}`;
          return { result: true, message: 'Login succeed' };
        })
        .catch((e) => {
          return { result: false, message: e.response?.data.message };
        });
    }

    return result;
  }

  async function signout(): Promise<void> {
    api.defaults.headers.Authorization = null;
    removeToken();
    removeIsAuthenticated();
    removeIsMfaAuthenticated();
    removeIsIsSocialLogin();
    removeEmail();
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
        removeToken,
        isAuthenticated,
        setIsAuthenticated,
        removeIsAuthenticated,
        isMfaAuthenticated,
        setIsMfaAuthenticated,
        removeIsMfaAuthenticated,
        isSocialLogin,
        setIsSocialLogin,
        removeIsIsSocialLogin,
        email,
        removeEmail,
        setEmail,
        isNeedRefresh,
        setIsNeedRefresh,
        isAdmin,
        setIsAdmin,
        isUser,
        setIsUser,
        isMfaEnabled,
        setIsMfaEnabled,
        isOpenMfaModal,
        setIsOpenMfaModal,
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
        mfaSignin,
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
