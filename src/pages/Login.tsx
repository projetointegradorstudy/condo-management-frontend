import { Input } from '../components/Input';
import { Button } from '../components/Button';

import '../styles/login.scss';

export function Login() {
  return (
    <main>
      <h1>
        <span>Condo</span>Management
      </h1>

      <h4>Sign in</h4>
      <form>
        <Input title="Username" name="username" id="username" type="text" placeholder="Insira o seu username" />

        <Input title="Senha" name="senha" id="senha" type="password" placeholder="Insira a sua senha" />
        <div>
          <a href="#">Esqueceu sua senha?</a>
          <Button title="Sign in" type="submit" />
        </div>
      </form>
    </main>
  );
}
