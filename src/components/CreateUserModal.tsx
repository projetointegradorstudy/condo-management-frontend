import { X } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { createUser } from '../services/api';
import { FormEvent, useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { Spinner } from './Spinner';
import { Case, IResultRequest } from '../interfaces';
import { ToastMessage } from '../components/ToastNotifications';
import '../styles/create-user-modal.scss';

export function CreateUserModal() {
  const [isEmail, setIsEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const { isOpenCreateUserModal, setIsOpenCreateUserModal, handleInputErros, handleInputErrosClean, setIsNeedRefresh } =
    getContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createUser(isEmail)
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Email cadastrado', type: Case.SUCCESS });
        return;
      })
      .catch((e) => {
        if (e.response.status === 409) ToastMessage({ message: 'Email já existe', type: Case.WARNING });
        if (e.response.status === 400) ToastMessage({ message: 'Email deve ser válido', type: Case.ERROR });
      });

    setIsLoading(false);
  };

  useEffect(() => {}, [isResult, isLoading]);

  const handleCloser = () => {
    setIsOpenCreateUserModal(false);
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
        </div>
      </div>
    );
  }

  return null;
}
