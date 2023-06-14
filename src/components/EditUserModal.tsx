import { X } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { InputPassword } from './InputPassword';
import { getContext } from '../utils/context-import';
import { IEditUserModal } from '../interfaces';
import avatarDefault from '../assets/avatar-default.png';
import '../styles/edit-user-modal.scss';

export function EditUserModal({ avatar, password, passwordConfirmation, created_at, role }: IEditUserModal) {
  const { isOpenEditModal, setIsOpenEditModal, formatDate } = getContext();

  if (isOpenEditModal) {
    return (
      <div className="modal-edit-user-background">
        <div className="modal-edit-user">
          <div className="modal-edit-user-button-close">
            <button className="modal-edit-user-button-default" onClick={() => setIsOpenEditModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-edit-user-content">
            <div className="modal-edit-user-image">
              <img src={avatar ? avatar : avatarDefault} alt="avatar" />
            </div>
            <form>
              <Label title="Senha" htmlFor="senha" />
              <InputPassword name="senha" id="senha" placeholder={password} autoComplete="on"></InputPassword>

              <Label title="Confirmar senha" htmlFor="senha" />
              <InputPassword name="senha" id="senha" placeholder={passwordConfirmation} autoComplete="on" />

              <Label title="Registrado" htmlFor="register" />
              <Input name="register" id="register" type="text" disabled placeholder={formatDate(created_at)} />

              <Label title="Regra" htmlFor="role" />
              <select name="role">
                <option disabled selected value="default">
                  Selecione a regra de usuário
                </option>
                <option value="admin">{role}</option>
                <option value="user">{role}</option>
              </select>

              <div className="modal-form-button">
                <Button title="Cancelar" onClick={() => setIsOpenEditModal(false)} isCancel />
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
