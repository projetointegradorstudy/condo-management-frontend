import { X } from 'phosphor-react';
import { Button } from './Button';
import { USERS } from '../utils/users';
import '../styles/delete-user-modal.scss';

interface DeleteUserModalProps {
  isOpenDeleteModal: boolean;
  setOpenDeleteModal: () => void;
}

export function DeleteUserModal({ isOpenDeleteModal, setOpenDeleteModal }: DeleteUserModalProps) {
  if (isOpenDeleteModal) {
    return (
      <div className="modal-delete-background">
        <div className="modal-delete-content">
          <div className="modal-delete-button-close">
            <button className="modal-delete-button-default" onClick={setOpenDeleteModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-delete-title">
            <h4>
              Tem certeza de que quer excluir este usuário:
              <b> {USERS[0].name}</b>?
            </h4>
          </div>

          <div className="modal-delete-content-form">
            <form>
              <div className="modal-delete-form-button">
                <Button title="Cancelar" onClick={setOpenDeleteModal} isCancel />
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
