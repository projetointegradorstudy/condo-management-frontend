import { X } from 'phosphor-react';
import { Button } from './Button';
import '../styles/delete-user-modal.scss';
import { getContext } from '../utils/context-import';
import { IDeleteModal, deleteMessages } from '../interfaces';
import { deleteUser } from '../services/api';
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';

export function DeleteUserModal({ id, name }: IDeleteModal) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const { isOpenDeleteModal, setIsOpenDeletModal, setIsNeedRefresh } = getContext();

  const handleDeleteUser = async () => {
    setIsLoading(true);
    await deleteUser(id)
      .then((res) => {
        setIsMessage(deleteMessages[res.data.message]);
        if (res.status === 200) setIsNeedRefresh(true);
      })
      .catch((e) => {
        setIsMessage(deleteMessages[e.response.data.message]);
      });
    setIsLoading(false);
  };

  useEffect(() => {}, [isMessage, isLoading]);

  const handleCloser = () => {
    setIsOpenDeletModal(false);
    setIsMessage('');
    setIsLoading(false);
  };

  if (isOpenDeleteModal) {
    return (
      <div className="modal-delete-background">
        <div className="modal-delete">
          <div className="modal-delete-button-close">
            <button className="modal-delete-button-default" onClick={() => setIsOpenDeletModal(false)}>
              <X size={20} />
            </button>
          </div>

          {isLoading && <Spinner />}
          {!isMessage && (
            <div className="modal-delete-content">
              <div className="modal-delete-message">
                <h4>
                  Tem certeza que deseja excluir este usuário:
                  <strong> {name}</strong>?
                </h4>
              </div>

              <div className="modal-delete-content-form">
                <Button title="Cancelar" onClick={() => setIsOpenDeletModal(false)} isCancel />
                <Button title="Confirmar" isConfirm onClick={handleDeleteUser} />
              </div>
            </div>
          )}
          {isMessage && (
            <div className="modal-create-content-feedback">
              <div>
                <span>{isMessage}</span>
              </div>

              <div className="modal-create-form-button">
                <Button title="Fechar" onClick={handleCloser} isCancel />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
