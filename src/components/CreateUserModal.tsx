import { X } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import '../styles/create-user-modal.scss';
import { createUser } from '../services/api';
import { useState } from 'react';
import { getContext } from '../utils/context-import';

export function CreateUserModal() {
  const [email, setEmail] = useState('');
  const { isOpenCreateUserModal, setOpenCreateUserModal } = getContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await createUser({ email });
  };

  if (isOpenCreateUserModal) {
    return (
      <div className="modal-create-background">
        <div className="modal-create-content">
          <div className="modal-create-button-close">
            <button className="modal-create-button-default" onClick={() => setOpenCreateUserModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-create-title">
            <h4>Adicionar usuário</h4>
          </div>

          <div className="modal-create-content-form">
            <form onSubmit={handleSubmit}>
              <Label title="Email" htmlFor="email" />
              <Input
                name="email"
                id="email"
                type="text"
                placeholder="teste@teste.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="modal-create-form-button">
                <Button title="Cancelar" onClick={() => setOpenCreateUserModal(false)} isCancel />
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
