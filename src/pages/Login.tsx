import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import { Button } from '../components/Button';
import cityImage from '../assets/city_life_gnpr_color.svg';
import '../styles/login.scss';
import { getContext } from '../utils/context-import';

export function Login() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signin, setToken, setIsAuthenticated } = getContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signin({ email, password });

    if (res.success && res.data?.access_token) {
      setToken(res.data?.access_token);
      setIsAuthenticated(true);
      navigate('/dashboard-admin');
    }
  };

  return (
    <div className="page-login">
      <aside>
        <div className="page-login-title">
          <h1>
            <span>Condo</span>Management
          </h1>
        </div>
        <div className="page-login-image">
          <img src={cityImage} />
          <strong>Lorem Ipsum</strong>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
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
              name="email"
              id="email"
              type="text"
              placeholder="Insira o seu email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label title="Password" htmlFor="senha" />
            <InputPassword
              name="senha"
              id="senha"
              placeholder="Insira a sua senha"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
            <div className="page-login-footer">
              <NavLink to="/forgot-password">Esqueceu sua senha?</NavLink>
              <Button isFull title="Sign in" type="submit" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
