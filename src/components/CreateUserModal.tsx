import { X, CheckCircle, WarningCircle, XCircle } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { createUser } from '../services/api';
import { useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { Spinner } from './Spinner';
import { IResultRequest, createUserMessages } from '../interfaces';
import '../styles/create-user-modal.scss';

export function CreateUserModal() {
  const [isEmail, setIsEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const { isOpenCreateUserModal, setIsOpenCreateUserModal, handleInputErros, handleInputErrosClean, setIsNeedRefresh } =
    getContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await createUser({ email: isEmail })
      .then((res) => {
        if (res.status === 201) {
          setIsResult({ message: createUserMessages[res.data.message], icon: <CheckCircle color="#38ba7c" /> });
          setIsNeedRefresh(true);
          return;
        }
        setIsResult({ message: createUserMessages[res.data.message], icon: <WarningCircle color="#ffc107" /> });
      })
      .catch((e) => {
        setIsResult({ message: createUserMessages[e.response.data.message], icon: <XCircle color="#f34542" /> });
      });

    setIsLoading(false);
  };

  useEffect(() => {}, [isResult, isLoading]);

  const handleCloser = () => {
    setIsOpenCreateUserModal(false);
    setIsResult(null);
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setIsOpenCreateUserModal(true);
    setIsResult(null);
    setIsLoading(false);
  };

  if (isOpenCreateUserModal) {
    return (
      <div className="modal-create-background">
        <div className="modal-create">
          <div className="modal-create-button-close">
            <button className="modal-create-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}
          {!isResult?.message && (
            <div className="modal-create-content">
              <div className="modal-create-message">
                <h4>Adicionar usuário</h4>
              </div>

              <div className="modal-create-content-form">
                <form onSubmit={handleSubmit}>
                  <Label title="Email" htmlFor="email" />
                  <Input
                    name="email"
                    id="email"
                    type="text"
                    placeholder="email@email.com"
                    onChange={(e) => {
                      setIsEmail(e.target.value);
                      handleInputErrosClean(e);
                    }}
                    required
                    onInvalid={handleInputErros}
                  />
                  <div className="modal-create-form-button">
                    <Button title="Cancelar" onClick={handleCloser} isCancel />
                    <Button title="Confirmar" type="submit" isConfirm />
                  </div>
                </form>
              </div>
            </div>
          )}

          {isResult?.message && (
            <div className="modal-create-content-feedback">
              {isResult.icon}

              <span>{isResult?.message}</span>

              <div className="modal-create-form-button">
                <Button title="Fechar" onClick={handleCloser} isCancel />
                <Button title="Adicionar novo" onClick={handleRefresh} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
