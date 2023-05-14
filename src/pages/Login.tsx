import { useContext, useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import '../styles/login.scss';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  if (!context) return null;

  const { signin, setToken, setIsAuthenticated } = context;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signin({ username, password });

    if (res.success && res.data?.access_token) {
      setToken(res.data?.access_token);
      setIsAuthenticated(true);
      navigate('/dashboard-admin');
    }
  };

  return (
    <main>
      <h1>
        <span>Condo</span>Management
      </h1>

      <h4>Sign in</h4>
      <form onSubmit={async (e) => await handleSubmit(e)}>
        <Input
          title="Username"
          name="username"
          id="username"
          type="text"
          placeholder="Insira o seu username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          title="Senha"
          name="senha"
          id="senha"
          type="password"
          placeholder="Insira a sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <a href="#">Esqueceu sua senha?</a>
          <Button title="Sign in" type="submit" />
        </div>
      </form>
    </main>
  );
}
