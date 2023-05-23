import { useState } from 'react';
import { Camera, X } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { USERS } from '../utils/users';
import '../styles/editusermodal.scss';

interface EditUserModalProps {
  isOpen: boolean;
  setOpenModal: () => void;
}

export function EditUserModal({ isOpen, setOpenModal }: EditUserModalProps) {
  const [image, setImage] = useState(null);

  if (isOpen) {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <div className="modal-button-close">
            <button className="modal-button-default" onClick={setOpenModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-title">
            <h4>Editar {USERS[0].name}</h4>
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
              <Input name="password" id="password" type="password" placeholder="******" />
              <Label title="Registrado" htmlFor="register" />
              <Input name="register" id="register" type="text" placeholder={USERS[0].registered_at} disabled />

              <div className="modal-form-button">
                <Button title="Cancelar" onClick={setOpenModal} isCancel />
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
