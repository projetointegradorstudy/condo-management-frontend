import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { Button } from '../components/Button';
import cityImage from '../assets/city_life_gnpr_color.svg';
import { getContext } from '../utils/context-import';
import { getRegex } from '../utils/regex';
import { Footer } from '../components/Footer';
import { ToggleButton } from '../components/ToggleButton';
import '../styles/login.scss';

export function Login() {
  const [hasError, setHasError] = useState({ email: false, password: false });
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { signin, setIsOpenConfirmSignoutModal } = getContext();

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
    await signin({ email: formData.email, password: formData.password });

    setIsLoading(false);
    setIsOpenConfirmSignoutModal(false);
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
      <ToggleButton />
      <div className="page-login">
        <aside>
          <div className="page-login-title">
            <h1>
              <span>Condo</span>Management
            </h1>
          </div>
          <div className="page-login-image">
            <img src={cityImage} />
            <strong>Reservas inteligentes para seu condomínio!</strong>
            <p>
              Realize reservas com apenas alguns cliques,
              <br /> economizando tempo e esforço.
            </p>
          </div>
        </aside>
        <main>
          <div className="page-login-logo">
            <h1>
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
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}
