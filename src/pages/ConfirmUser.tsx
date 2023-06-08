import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Label } from '../components/Label';
import '../styles/confirm-user.scss';

export function ConfirmUser() {
  return (
    <div className="page-confirm-user">
      <div className="page-confirm-user-logo">
        <h1>
          <span>Condo</span>Management
        </h1>
      </div>
      <div className="page-confirm-user-form">
        <h4>Cadastre sua senha</h4>
        <form>
          <Label title="Senha" htmlFor="senha" />
          <InputPassword name="senha" id="senha" placeholder="Insira a sua senha" />

          <Label title="Confirme a senha" htmlFor="confirmar-senha" />
          <InputPassword name="confirmar-senha" id="confirmar-senha" placeholder="Confirme a sua senha" />

          <div className="page-confirm-user-footer">
            <Button isFull title="Cadastrar senha" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
