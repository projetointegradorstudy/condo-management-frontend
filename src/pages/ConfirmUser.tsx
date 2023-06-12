import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { CheckCircle, Spinner } from 'phosphor-react';
import navigatorA479 from '../assets/undraw_navigator_a479.svg';
import { Footer } from '../components/Footer';
import '../styles/confirm-user.scss';

export function ConfirmUser() {
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
