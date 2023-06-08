import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

        <svg className="wave-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#081226"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,208C384,224,480,224,576,202.7C672,181,768,139,864,149.3C960,160,1056,224,1152,229.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <svg className="wave-second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#EAEEF2"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,208C384,224,480,224,576,202.7C672,181,768,139,864,149.3C960,160,1056,224,1152,229.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </aside>
      <main>
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
              <a href="#">Esqueceu sua senha?</a>
              <Button isFull title="Sign in" type="submit" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
