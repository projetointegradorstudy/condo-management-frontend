import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { Case, IDeleteModal, IResultReservation } from '../interfaces';
import { deleteUser, deleteEnvironment } from '../services/api';
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';
import { ToastMessage } from '../components/ToastNotifications';
import '../styles/delete-modal.scss';

export function DeleteModal({ id, name, source }: IDeleteModal) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultReservation | null>(null);
  const { isOpenDeleteModal, setIsOpenDeletModal, setIsNeedRefresh } = getContext();

  const handleDeleteUser = async () => {
    setIsLoading(true);
    if (source === 'user') {
      await deleteUser(id)
        .then((res) => {
          handleCloser();
          if (res.status === 200) {
            setIsNeedRefresh(true);
            ToastMessage({ message: 'Usuário excluido', type: Case.SUCCESS });
            return;
          }
          ToastMessage({ message: 'Já excluido', type: Case.WARNING });
        })
        .catch(() => {
          ToastMessage({ message: 'ID inválido', type: Case.ERROR });
        });
    } else if (source === 'environment') {
      await deleteEnvironment(id)
        .then((res) => {
          handleCloser();
          if (res.status === 200) {
            setIsNeedRefresh(true);
            ToastMessage({ message: 'Ambiente excluido', type: Case.SUCCESS });
            return;
          }
          ToastMessage({ message: 'Já excluido', type: Case.WARNING });
        })
        .catch(() => {
          ToastMessage({ message: 'ID inválido', type: Case.ERROR });
        });
    }
    setIsLoading(false);
    setIsOpenDeletModal(false);
  };

  useEffect(() => {}, [isResult, isLoading]);

  const handleCloser = () => {
    setIsOpenDeletModal(false);
    setIsResult(null);
    setIsLoading(false);
  };

  if (isOpenDeleteModal) {
    return (
      <div className="modal-delete-background">
        <div className="modal-delete">
          <div className="modal-delete-button-close">
            <button className="modal-delete-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>

          {isLoading && <Spinner />}
          {!isResult && (
            <div className="modal-delete-content">
              <div className="modal-delete-message">
                <h4>
                  Tem certeza que deseja <strong>excluir</strong>:
                  <br />
                  <strong> {name}</strong>?
                </h4>
              </div>

              <div className="modal-delete-content-form">
                <Button title="Cancelar" onClick={handleCloser} isCancel />
                <Button title="Confirmar" isConfirm onClick={handleDeleteUser} />
              </div>
            </div>
          )}
          {isResult && (
            <div className="modal-delete-content-feedback">
              {isResult.icon}

              <span>{isResult.message}</span>

              <div className="modal-delete-form-button">
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
