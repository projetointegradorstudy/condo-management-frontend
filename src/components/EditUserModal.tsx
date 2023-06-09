import { X } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { USERS } from '../utils/users';
import '../styles/edit-user-modal.scss';
import { InputPassword } from './InputPassword';

interface EditUserModalProps {
  isOpenEditModal: boolean;
  setOpenEditModal: () => void;
}

export function EditUserModal({ isOpenEditModal, setOpenEditModal }: EditUserModalProps) {
  if (isOpenEditModal) {
    return (
      <div className="modal-edit-background">
        <div className="modal-content">
          <div className="modal-button-close">
            <button className="modal-button-default" onClick={setOpenEditModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-content-form">
            <form>
              <div className="modal-content-upload">
                <div className="modal-image-upload">
                  <img src={USERS[0].avatar} alt="avatar" />
                </div>
              </div>

              <Label title="Senha" htmlFor="senha" />
              <InputPassword name="senha" id="senha" placeholder="Insira a senha" autoComplete="on" />

              <Label title="Confirmar senha" htmlFor="senha" />
              <InputPassword name="senha" id="senha" placeholder="Confirme a senha" autoComplete="on" />

              <Label title="Registrado" htmlFor="register" />
              <Input name="register" id="register" type="text" disabled placeholder="01/02/23" />

              <Label title="Registrado" htmlFor="register" />
              <select name="role">
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
              </select>

              <div className="modal-form-button">
                <Button title="Cancelar" onClick={setOpenEditModal} isCancel />
                <Button title="Confirmar" type="submit" isConfirm />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
