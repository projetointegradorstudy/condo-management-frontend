import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Spinner } from '../components/Spinner';
import { CheckCircle, XCircle } from 'phosphor-react';
import buildingReXfcm from '../assets/undraw_building_re_xfcm.svg';
import { Footer } from '../components/Footer';
import { forgotUserPassword } from '../services/api';
import { getRegex } from '../utils/regex';
import { IResultReservation, resetUserPasswordMessages } from '../interfaces';
import '../styles/forgot-password.scss';

export function ForgotPassaword() {
  const [hasError, setHasError] = useState({ email: false });
  const [formData, setFormData] = useState({ email: '' });
  const [errorMessage, setErrorMessage] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<IResultReservation | null>(null);

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
    await forgotUserPassword(formData.email)
      .then((res) => {
        setIsResult({ message: resetUserPasswordMessages[res.data.message], icon: <CheckCircle color="#38ba7c" /> });
      })
      .catch((e) => {
        setIsResult({ message: resetUserPasswordMessages[e.response.data.message], icon: <XCircle color="#f34542" /> });
      });

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

  useEffect(() => {}, [isResult, isLoading]);

  return (
    <div className="page-forgot-password">
      <aside>
        <div className="page-forgot-password-title">
          <h1>
            <span>Condo</span>Management
          </h1>
        </div>
        <div className="page-forgot-password-image">
          <img src={buildingReXfcm} />
        </div>
        <div className="page-forgot-password-description">
          <strong>Esqueceu sua senha?</strong>
          <p>Para recuperá-la, informe seu endereço de email.</p>
        </div>
      </aside>
      <main>
        <div className="page-forgot-password-logo">
          <h1>
            <span>Condo</span>Management
          </h1>
        </div>
        {isLoading && <Spinner />}
        {!isResult && (
          <div className="page-forgot-password-form">
            <h4>Recuperação de senha</h4>
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

              <div className="page-forgot-password-footer">
                <Button isFull title="Recuperar senha" type="submit" />
              </div>
            </form>

            <div className="page-forgot-password-footer-login">
              <span>ou</span>
              <NavLink to="/">Entrar</NavLink>
            </div>
          </div>
        )}

        {isResult && (
          <div className="page-forgot-password-feedback">
            {isResult?.icon}

            <span>{isResult.message}</span>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
