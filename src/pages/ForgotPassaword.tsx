import { FormEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Spinner } from '../components/Spinner';
import { getContext } from '../utils/context-import';
import { CheckCircle, XCircle } from 'phosphor-react';
import buildingReXfcm from '../assets/undraw_building_re_xfcm.svg';
import { Footer } from '../components/Footer';
import '../styles/forgot-password.scss';
import { forgotUserPassword } from '../services/api';
import { IResultRequest, resetUserPasswordMessages } from '../interfaces';

export function ForgotPassaword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const [isEmail, setIsEmail] = useState<string>('');
  const { handleInputErros, handleInputErrosClean } = getContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await forgotUserPassword(isEmail)
      .then((res) => {
        setIsResult({ message: resetUserPasswordMessages[res.data.message], icon: <CheckCircle color="#38ba7c" /> });
      })
      .catch((e) => {
        setIsResult({ message: resetUserPasswordMessages[e.response.data.message], icon: <XCircle color="#f34542" /> });
      });

    setIsLoading(false);
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
                name="email"
                id="email"
                type="text"
                placeholder="Insira o seu email"
                onChange={(e) => {
                  handleInputErrosClean(e);
                  setIsEmail(e.target.value);
                }}
                required
                onInvalid={handleInputErros}
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
