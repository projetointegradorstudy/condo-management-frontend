import { X } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { USERS } from '../utils/users';
import '../styles/edit-user-modal.scss';

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
                <div className="modal-button-upload">
                  <p>Imagem</p>
                  <Label title="Choose file" htmlFor="avatar" isUploadFile />
                  <Input title="Choose file" type="file" name="avatar" id="avatar" accept=".png, .jpg" hidden />
                </div>
              </div>
              <Label title="Nome" htmlFor="nome" />
              <Input name="nome" id="nome" type="text" placeholder={USERS[0].name} />
              <Label title="Username" htmlFor="username" />
              <Input name="username" id="username" type="text" placeholder={USERS[0].user_name} />
              <Label title="Senha" htmlFor="password" />
              <Input name="password" id="password" type="password" placeholder="******" autoComplete="on" />
              <Label title="Registrado" htmlFor="register" />
              <Input name="register" id="register" type="text" placeholder={USERS[0].registered_at} disabled />

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
