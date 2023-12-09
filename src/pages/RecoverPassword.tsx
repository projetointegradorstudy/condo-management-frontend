import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { CheckCircle, Spinner, XCircle } from 'phosphor-react';
import forSale from '../assets/undraw_cabin_hkfr.svg';
import { Footer } from '../components/Footer';
import { useLocation } from 'react-router';
import { IResultReservation } from '../interfaces';
import { resetPassword } from '../services/api';
import { CountDown } from '../components/CountDown';
import { getRegex } from '../utils/regex';
import '../styles/recover-password.scss';

export function RecoverPassword() {
  const [hasError, setHasError] = useState({ password: false, passwordConfirmation: false });
  const [formData, setFormData] = useState({ password: '', passwordConfirmation: '' });
  const [errorMessage, setErrorMessage] = useState({ password: '', passwordConfirmation: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultReservation | null>(null);
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

  useEffect(() => {
    if (formData.password === formData.passwordConfirmation) clearAllErrors();
  }, [formData.password, formData.passwordConfirmation]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFields()) return;
    setIsLoading(true);

    await resetPassword(getToken(), {
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

  const clearAllErrors = () => {
    setErrorMessage({ password: '', passwordConfirmation: '' });
    setHasError({ password: false, passwordConfirmation: false });
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
        : formData.password !== formData.passwordConfirmation
        ? 'Senhas devem ser iguais'
        : null,
      passwordConfirmation: !formData.passwordConfirmation
        ? 'Campo obrigatório'
        : formData.password !== formData.passwordConfirmation
        ? 'Senhas devem ser iguais'
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
    <>
      <div className="page-recover-password">
        <aside>
          <div className="page-recover-password-title">
            <h1>
              <span>Condo</span>Management
            </h1>
          </div>
          <div className="page-recover-password-image">
            <img src={forSale} />
          </div>
          <div className="page-recover-password-description">
            <strong>Alteração de senha</strong>
            <p>Para alterar, basta inserir a senha que deseja e confirmar.</p>
          </div>
        </aside>
        <main>
          <div className="page-recover-password-logo">
            <h1>
              <span>Condo</span>Management
            </h1>
          </div>
          {isLoading && <Spinner />}
          {!isResult && (
            <div className="page-recover-password-form">
              <h4>Insira sua nova senha:</h4>
              <form onSubmit={handleSubmit}>
                <Label title="Senha" htmlFor="password" />
                <InputPassword
                  className={hasError.password ? 'field-error' : ''}
                  name="password"
                  id="password"
                  placeholder="Insira a sua senha"
                  onChange={handleFieldChange}
                  message={hasError.password ? errorMessage.password : undefined}
                />

                <Label title="Confirme a senha" htmlFor="passwordConfirmation" />
                <InputPassword
                  className={hasError.passwordConfirmation ? 'field-error' : ''}
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Confirme a sua senha"
                  onChange={handleFieldChange}
                  message={hasError.passwordConfirmation ? errorMessage.passwordConfirmation : undefined}
                />

                <div className="page-recover-password-footer">
                  <Button isFull title="Alterar senha" type="submit" />
                </div>
              </form>
            </div>
          )}

          {isResult && (
            <div className="page-recover-password-feedback">
              {isResult.icon}

              <span>{isResult.message}</span>
              {isRemainingSeconds && <CountDown />}
            </div>
          )}
          <Footer />
        </main>
      </div>
    </>
  );
}
