import { X } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { createUser } from '../services/api';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { Spinner } from './Spinner';
import { Case, IResultRequest } from '../interfaces';
import { getRegex } from '../utils/regex';
import { ToastMessage } from '../components/ToastNotifications';
import '../styles/create-user-modal.scss';

export function CreateUserModal() {
  const [hasError, setHasError] = useState({ email: false });
  const [formData, setFormData] = useState({ email: '' });
  const [errorMessage, setErrorMessage] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const { isOpenCreateUserModal, setIsOpenCreateUserModal, setIsNeedRefresh } = getContext();

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target;
    setErrorMessage({ ...errorMessage, [field.name]: '' });
    setHasError({ ...hasError, [field.name]: false });
    setFormData({ ...formData, [field.name]: field.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFields()) return;
    setIsLoading(true);
    await createUser(formData.email)
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Email cadastrado', type: Case.SUCCESS });
        return;
      })
      .catch((e) => {
        if (e.response.status === 409) ToastMessage({ message: 'Email já cadastrado', type: Case.WARNING });
      });

    setIsLoading(false);
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      email: !formData.email
        ? 'Campo obrigatório'
        : !getRegex.email.test(formData.email)
        ? 'Email deve ser válido'
        : null,
    };
    for (const field in errors) {
      if (errors[field]) {
        tempMessage[field] = errors[field];
        tempError[field] = true;
        hasTempError = true;
      }
    }
    setErrorMessage({ ...errorMessage, ...tempMessage });
    setHasError({ ...hasError, ...tempError });
    return hasTempError;
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
                  className={hasError.email ? 'field-error' : ''}
                  name="email"
                  id="email"
                  type="text"
                  placeholder="email@email.com"
                  onChange={handleFieldChange}
                  message={hasError.email ? errorMessage.email : undefined}
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
