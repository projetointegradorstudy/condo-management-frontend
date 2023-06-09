import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import '../styles/forgot-password.scss';

export function ForgotPassaword() {
  return (
    <div className="page-forgot-password">
      <div className="page-forgot-password-logo">
        <h1>
          <span>Condo</span>Management
        </h1>
      </div>
      <div className="page-forgot-password-form">
        <h4>Recuperação de senha</h4>
        <span>Para recuperar a sua senha, informe seu endereço de email.</span>
        <form>
          <Label title="Email" htmlFor="email" />
          <Input name="email" id="email" type="text" placeholder="Insira o seu email" />

          <div className="page-forgot-password-footer">
            <Button isFull title="Recuperar senha" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
