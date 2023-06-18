import { CheckCircle, WarningCircle, X, XCircle } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { IDeleteModal, IResultRequest, deleteMessages } from '../interfaces';
import { deleteUser, deleteEnvironment } from '../services/api';
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';
import '../styles/delete-user-modal.scss';

export function DeleteModal({ id, name, source }: IDeleteModal) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const { isOpenDeleteModal, setIsOpenDeletModal, setIsNeedRefresh } = getContext();

  const handleDeleteUser = async () => {
    setIsLoading(true);
    if (source === 'user') {
      await deleteUser(id)
        .then((res) => {
          if (res.status === 200) {
            setIsResult({ message: deleteMessages[res.data.message], icon: <CheckCircle color="#38ba7c" /> });
            setIsNeedRefresh(true);
            return;
          }
          setIsResult({ message: deleteMessages[res.data.message], icon: <WarningCircle color="#ffc107" /> });
        })
        .catch((e) => {
          setIsResult({ message: deleteMessages[e.data.message], icon: <XCircle color="#f34542" /> });
        });
    } else if (source === 'environment') {
      await deleteEnvironment(id)
        .then((res) => {
          if (res.status === 200) {
            setIsResult({ message: deleteMessages[res.data.message], icon: <CheckCircle color="#38ba7c" /> });
            setIsNeedRefresh(true);
            return;
          }
          setIsResult({ message: deleteMessages[res.data.message], icon: <WarningCircle color="#ffc107" /> });
        })
        .catch((e) => {
          setIsResult({ message: deleteMessages[e.data.message], icon: <XCircle color="#f34542" /> });
        });
    }
    setIsLoading(false);
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
            <button className="modal-delete-button-default" onClick={() => setIsOpenDeletModal(false)}>
              <X size={20} />
            </button>
          </div>

          {isLoading && <Spinner />}
          {!isResult && (
            <div className="modal-delete-content">
              <div className="modal-delete-message">
                <h4>
                  Tem certeza que deseja excluir:
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
