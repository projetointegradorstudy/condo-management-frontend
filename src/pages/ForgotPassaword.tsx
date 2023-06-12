import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Spinner } from '../components/Spinner';
import { getContext } from '../utils/context-import';
import '../styles/forgot-password.scss';
import { CheckCircle } from 'phosphor-react';
import buildingReXfcm from '../assets/undraw_building_re_xfcm.svg';

export function ForgotPassaword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const { handleInputErros, handleInputErrosClean } = getContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    //
    setIsLoading(false);
  };

  useEffect(() => {}, [isMessage, isLoading]);

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
        {!isMessage && (
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

        {isMessage && (
          <div className="page-forgot-password-feedback">
            <CheckCircle />

            <span>{isMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}
