import { ChangeEvent, FormEvent, useState } from 'react';
import { X } from 'phosphor-react';
import { Case, IEditUser, IResultReservation, Roles } from '../interfaces';
import { adminUpdateUser } from '../services/api';
import { getContext } from '../utils/context-import';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { InputPassword } from './InputPassword';
import avatarDefault from '../assets/avatar-default.png';
import { Spinner } from './Spinner';
import { ToastMessage } from '../components/ToastNotifications';
import '../styles/edit-user-modal.scss';

export function EditUserModal({ id, avatar, created_at, role }: IEditUser) {
  const { isOpenEditModal, setIsOpenEditModal, formatDate, setIsNeedRefresh } = getContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultReservation | null>(null);
  const [isRoleField, setIsRoleField] = useState<Partial<IEditUser>>({
    role,
  });
  const [isFormValue, setIsFormValue] = useState<Partial<IEditUser>>();

  const handleFieldChange = (e: ChangeEvent<any>) => {
    const field = e.target;
    const file = field.files?.[0];
    if (file) {
      setIsFormValue({ ...isFormValue, avatar: file });
    } else {
      setIsFormValue({ ...isFormValue, [field.name]: field.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);
    if (isFormValue) {
      await adminUpdateUser(id, isFormValue)
        .then(() => {
          handleCloser();
          setIsNeedRefresh(true);
          ToastMessage({ message: 'Atualizado com sucesso', type: Case.SUCCESS });
        })
        .catch(() => {});
    }
    form?.reset();
    cleanData();
  };

  const handleCloser = () => {
    setIsOpenEditModal(false);
    setIsLoading(false);
  };

  const cleanData = () => {
    setIsFormValue(undefined);
    setIsLoading(false);
  };

  if (isOpenEditModal) {
    return (
      <div className="modal-edit-user-background">
        <div className={!isResult ? 'modal-edit-user' : 'modal-edit-user-feedback'}>
          <div className="modal-edit-user-button-close">
            <button className="modal-edit-user-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}

          <div className="modal-edit-user-content">
            <div className="modal-edit-user-image">
              <img src={typeof avatar === 'string' ? avatar : avatarDefault} alt="avatar" />
            </div>
            <form onSubmit={handleSubmit} id="form">
              <Label title="Senha" htmlFor="password" />
              <InputPassword
                name="password"
                id="password"
                placeholder="********"
                autoComplete="on"
                onChange={handleFieldChange}
              ></InputPassword>

              <Label title="Confirmar senha" htmlFor="password-confirmation" />
              <InputPassword
                name="password-confirmation"
                id="password-confirmation"
                placeholder="********"
                autoComplete="on"
                onChange={handleFieldChange}
              />

              <Label title="Data de registro" htmlFor="register" />
              <Input name="register" id="register" type="text" disabled placeholder={formatDate(created_at)} />

              <Label title="Regra" htmlFor="role" />
              <select value={isFormValue?.role || role} name="role" onChange={handleFieldChange}>
                {Object.values(Roles).map((optRole, index) => (
                  <option key={index} value={optRole}>
                    {optRole.slice(0, 1).toUpperCase() + optRole.slice(1)}
                  </option>
                ))}
              </select>

              <div className="modal-form-button">
                <Button title="Cancelar" onClick={handleCloser} isCancel />
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
