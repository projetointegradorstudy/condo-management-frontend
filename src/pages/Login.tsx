import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { Button } from '../components/Button';
import cityImage from '../assets/city_life_gnpr_color.svg';
import { getContext } from '../utils/context-import';
import { getRegex } from '../utils/regex';
import { ToastMessage, ToastNotifications } from '../components/ToastNotifications';
import { Case, IFacebookOAuth, IGoogleOAuth, IMicrosoftOAuth } from '../interfaces';
import { Spinner } from '../components/Spinner';
import { LoginSocialGoogle, LoginSocialFacebook, LoginSocialMicrosoft, IResolveParams } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton, MicrosoftLoginButton } from 'react-social-login-buttons';
import '../styles/login.scss';

export function Login() {
  const [hasError, setHasError] = useState({ email: false, password: false });
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { signinFacebookOauth, signinGoogleOauth, signinMicrosoftOauth, signin, setIsOpenConfirmSignoutModal } =
    getContext();
  const redirectUri = window.location.href;

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target;
    setErrorMessage({ ...errorMessage, [field.name]: '' });
    setHasError({ ...hasError, [field.name]: false });
    setFormData({ ...formData, [field.name]: field.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFields()) return;
    setIsLoading(true);
    const data = await signin({ email: formData.email, password: formData.password });

    if (!data.result) ToastMessage({ message: 'Credenciais inválidas', type: Case.ERROR });

    setIsLoading(false);
    setIsOpenConfirmSignoutModal(false);
  };

  const handleFacebookOauth = async (credentialResponse: IFacebookOAuth) => {
    setIsLoading(true);
    if (!credentialResponse.email) return;
    const data = await signinFacebookOauth(credentialResponse);

    if (!data.result) ToastMessage({ message: 'Credenciais inválidas', type: Case.ERROR });
    setIsLoading(false);
  };

  const handleGoogleOauth = async (credentialResponse: IGoogleOAuth) => {
    setIsLoading(true);
    if (!credentialResponse.email) return;
    const data = await signinGoogleOauth(credentialResponse);

    if (!data.result) ToastMessage({ message: 'Credenciais inválidas', type: Case.ERROR });
    setIsLoading(false);
  };

  const handleMicrosoftOauth = async (credentialResponse: IMicrosoftOAuth) => {
    setIsLoading(true);
    if (!credentialResponse.accessToken) return;
    const data = await signinMicrosoftOauth(credentialResponse);

    if (!data.result) ToastMessage({ message: 'Credenciais inválidas', type: Case.ERROR });
    setIsLoading(false);
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      email: !formData.email
        ? 'Campo obrigatório'
        : !getRegex.email.test(formData.email)
        ? 'Email deve ser válido'
        : null,
      password: !formData.password
        ? 'Campo obrigatório'
        : !getRegex.password.test(formData.password)
        ? 'Senha deve possuir pelo menos 10 caracteres entre estes: (A-Z, a-z, 0-9, !-@-$-*)'
        : null,
    };
    for (const field in errors) {
      if (errors[field]) {
        tempMessage[field] = errors[field];
        tempError[field] = true;
        hasTempError = true;
      }
    }
    setErrorMessage({ ...errorMessage, ...tempMessage });
    setHasError({ ...hasError, ...tempError });
    return hasTempError;
  };

  return (
    <>
      <div className="page-login">
        <aside>
          <div className="page-login-title">
            <h1 title="Condo Management">
              <span>Condo</span>Management
            </h1>
            {isLoading && <Spinner />}
          </div>
          <div className="page-login-image">
            <img src={cityImage} alt="Dois prédios e uma rua com cinco pessoas" />
            <strong title="Reservas inteligentes para seu condomínio!">
              Reservas inteligentes para seu condomínio!
            </strong>
            <p title="Realize reservas com apenas alguns cliques, economizando tempo e esforço.">
              Realize reservas com apenas alguns cliques,
              <br /> economizando tempo e esforço.
            </p>
          </div>
        </aside>
        <main>
          <div className="page-login-logo">
            <h1 title="Condo Management">
              <span>Condo</span>Management
            </h1>
          </div>
          <div className="page-login-content">
            <h4>Sign in</h4>
            <form onSubmit={handleSubmit}>
              <Label title="Email" htmlFor="email" />
              <Input
                className={hasError.email ? 'field-error' : ''}
                name="email"
                id="email"
                type="text"
                placeholder="Insira o seu email"
                onChange={handleFieldChange}
                message={hasError.email ? errorMessage.email : undefined}
              />
              <Label title="Senha" htmlFor="password" />
              <InputPassword
                className={hasError.password ? 'field-error' : ''}
                name="password"
                id="password"
                placeholder="Insira a sua senha"
                onChange={handleFieldChange}
                message={hasError.password ? errorMessage.password : undefined}
                autoComplete="on"
              />
              <div className="page-login-footer">
                <NavLink to="/forgot-password">Esqueceu sua senha?</NavLink>
                <Button isFull title="Sign in" type="submit" />
              </div>
            </form>
            <div className="divider-wrapper">
              <span>ou</span>
            </div>
            <div className="oauth-content">
              <LoginSocialGoogle
                className="button-container"
                typeResponse="idToken"
                client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                onResolve={({ data }: IResolveParams) => {
                  if (data) handleGoogleOauth({ email: data.email, accessToken: data.credential });
                }}
                onReject={(err) => {
                  console.error(err);
                }}
              >
                <GoogleLoginButton className="login-button" />
              </LoginSocialGoogle>
              <LoginSocialFacebook
                className="button-container"
                fieldsProfile="email"
                appId={process.env.REACT_APP_FB_APP_ID as string}
                onResolve={({ data }: IResolveParams) => {
                  if (data) handleFacebookOauth({ email: data.email, accessToken: data.accessToken });
                }}
                onReject={(err) => {
                  console.error(err);
                }}
              >
                <FacebookLoginButton className="login-button" />
              </LoginSocialFacebook>
              <LoginSocialMicrosoft
                className="button-container"
                scope="user.read"
                prompt="select_account"
                tenant="consumers"
                client_id={process.env.REACT_APP_MS_CLIENT_ID as string}
                redirect_uri={redirectUri}
                onResolve={({ data }: IResolveParams) => {
                  if (data) handleMicrosoftOauth({ email: data.mail, accessToken: data.access_token });
                }}
                onReject={(err) => {
                  console.error(err);
                }}
              >
                <MicrosoftLoginButton className="login-button" />
              </LoginSocialMicrosoft>
            </div>
          </div>
        </main>
      </div>
      <ToastNotifications />
    </>
  );
}
