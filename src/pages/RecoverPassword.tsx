import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { CheckCircle, Spinner, XCircle } from 'phosphor-react';
import forSale from '../assets/undraw_cabin_hkfr.svg';
import { Footer } from '../components/Footer';
import { useLocation } from 'react-router';
import { Form, IResultRequest, createPasswordMessages } from '../interfaces';
import { createUserPassword } from '../services/api';
import '../styles/recover-password.scss';

export function RecoverPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
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
        setIsResult({ message: createPasswordMessages[e.response.data.message], icon: <XCircle color="#f34542" /> });
        console.log(e.response.data.message);
      });
    setIsLoading(false);
  };

  useEffect(() => {}, [isLoading, isResult]);

  return (
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
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
