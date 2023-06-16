import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { CheckCircle, Spinner } from 'phosphor-react';
import navigatorA479 from '../assets/undraw_navigator_a479.svg';
import { Footer } from '../components/Footer';
import '../styles/confirm-user.scss';
import { useLocation } from 'react-router';
import { Form } from '../interfaces';
import { createUserPassword } from '../services/api';

export function ConfirmUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const { setToken, setIsAuthenticated, handleInputErros, handleInputErrosClean } = getContext();
  const location = useLocation();
  const form = new Form();

  const getToken = (): string => {
    return new URLSearchParams(location.search).get('token')?.trim() || '';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    await createUserPassword(getToken(), form.get())
      .then((res) => {
        console.log(res);
        // if (res.status === 201) {
        //   setIsResult({ message: createUserMessages[res.data.message], icon: <CheckCircle /> });
        //   setIsNeedRefresh(true);
        //   return;
        // }
        setToken(res.data.access_token);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
    setIsLoading(false);
  };

  useEffect(() => {}, [isLoading, isMessage]);

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
        {!isMessage && (
          <div className="page-confirm-user-form">
            <h4>Cadastre sua senha</h4>
            <form onSubmit={handleSubmit}>
              <Label title="Senha" htmlFor="senha" />
              <InputPassword
                name="senha"
                id="senha"
                placeholder="Insira a sua senha"
                onChange={(e) => {
                  handleInputErrosClean(e);
                  form.set({ password: e.target.value });
                }}
                required
                onInvalid={handleInputErros}
              />

              <Label title="Confirme a senha" htmlFor="confirmar-senha" />
              <InputPassword
                name="confirmar-senha"
                id="confirmar-senha"
                placeholder="Confirme a sua senha"
                onChange={(e) => {
                  handleInputErrosClean(e);
                  form.set({ passwordConfirmation: e.target.value });
                }}
                required
                onInvalid={handleInputErros}
              />

              <div className="page-confirm-user-footer">
                <Button isFull title="Cadastrar senha" type="submit" />
              </div>
            </form>
          </div>
        )}

        {isMessage && (
          <div className="page-confirm-user-feedback">
            <CheckCircle />

            <span>{isMessage}</span>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
