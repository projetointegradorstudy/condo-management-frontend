import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { CheckCircle, Spinner, XCircle } from 'phosphor-react';
import navigatorA479 from '../assets/undraw_navigator_a479.svg';
import { Footer } from '../components/Footer';
import { useLocation } from 'react-router';
import { IResultRequest } from '../interfaces';
import { createUserPassword } from '../services/api';
import { CountDown } from '../components/CountDown';
import { ToastNotifications } from '../components/ToastNotifications';
import { getRegex } from '../utils/regex';
import '../styles/confirm-user.scss';

export function ConfirmUser() {
  const [hasError, setHasError] = useState({ password: false, passwordConfirmation: false });
  const [formData, setFormData] = useState({ password: '', passwordConfirmation: '' });
  const [errorMessage, setErrorMessage] = useState({ password: '', passwordConfirmation: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const { setToken, setIsAuthenticated, isRemainingSeconds, setIsRemaingSeconds } = getContext();
  const location = useLocation();

  const getToken = (): string => {
    return new URLSearchParams(location.search).get('token')?.trim() || '';
  };

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
    await createUserPassword(getToken(), {
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation,
    })
      .then((res) => {
        setIsRemaingSeconds(3);

        setIsResult({ message: 'Você será redirecionado em...', icon: <CheckCircle color="#38ba7c" /> });
        setTimeout(() => {
          setToken(res.data.access_token);
          setIsAuthenticated(true);
        }, 4000);
      })
      .catch((e) => {
        if (e.response.status === 404) setIsResult({ message: 'Token inválido', icon: <XCircle color="#f34542" /> });
      });
    setIsLoading(false);
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      password: !formData.password
        ? 'Campo obrigatório'
        : !getRegex.password.test(formData.password)
        ? 'Senha deve possuir pelo menos 10 caracteres entre estes: (A-Z, a-z, 0-9, !-@-$-*)'
        : null,
      passwordConfirmation: !formData.passwordConfirmation
        ? 'Campo obrigatório'
        : !getRegex.passwordConfirmation.test(formData.passwordConfirmation)
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

  useEffect(() => {}, [isLoading, isResult]);

  return (
    <div className="page-confirm-user">
      <aside>
        <div className="page-confirm-user-title">
          <h1>
            <span>Condo</span>Management
          </h1>
        </div>
        <div className="page-confirm-user-image">
          <img src={navigatorA479} />
        </div>
        <div className="page-confirm-user-description">
          <strong>Cadastro de senha</strong>
          <p>Para cadastrar, basta inserir a senha que deseja e confirmar.</p>
        </div>
      </aside>
      <main>
        <div className="page-confirm-user-logo">
          <h1>
            <span>Condo</span>Management
          </h1>
        </div>
        {isLoading && <Spinner />}
        {!isResult && (
          <div className="page-confirm-user-form">
            <h4>Cadastre sua senha</h4>
            <form onSubmit={handleSubmit}>
              <Label title="Senha" htmlFor="password" />
              <InputPassword
                name="password"
                id="password"
                maxLength={30}
                placeholder="Insira a sua senha"
                onChange={handleFieldChange}
                message={hasError.password ? errorMessage.password : undefined}
              />

              <Label title="Confirme a senha" htmlFor="passwordConfirmation" />
              <InputPassword
                name="passwordConfirmation"
                id="passwordConfirmation"
                maxLength={30}
                placeholder="Confirme a sua senha"
                onChange={handleFieldChange}
                message={hasError.passwordConfirmation ? errorMessage.passwordConfirmation : undefined}
              />

              <div className="page-confirm-user-footer">
                <Button isFull title="Cadastrar senha" type="submit" />
              </div>
            </form>
          </div>
        )}

        {isResult && (
          <div className="page-confirm-user-feedback">
            {isResult.icon}

            <span>{isResult.message}</span>
            {isRemainingSeconds && <CountDown />}
          </div>
        )}
        <Footer />
        <ToastNotifications />
      </main>
    </div>
  );
}
