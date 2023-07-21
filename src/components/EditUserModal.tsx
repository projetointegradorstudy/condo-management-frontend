import { FormEvent, useState } from 'react';
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
  const newFormValues: Partial<IEditUser> = { ...isFormValue };

  const setFormValue = (prop: Partial<IEditUser>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      if (!prop[key].length) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);

    await adminUpdateUser(id, newFormValues)
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Atualizado com sucesso', type: Case.SUCCESS });
      })
      .catch(() => {});
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
                onChange={(e) => setFormValue({ password: e.target.value })}
              ></InputPassword>

              <Label title="Confirmar senha" htmlFor="password-confirmation" />
              <InputPassword
                name="password-confirmation"
                id="password-confirmation"
                placeholder="********"
                autoComplete="on"
                onChange={(e) => setFormValue({ passwordConfirmation: e.target.value })}
              />

              <Label title="Data de registro" htmlFor="register" />
              <Input name="register" id="register" type="text" disabled placeholder={formatDate(created_at)} />

              <Label title="Regra" htmlFor="role" />
              <select
                value={isRoleField.role}
                name="role"
                onChange={(e) => {
                  setIsRoleField({ role: Roles[e.target.value.toLocaleUpperCase()] });
                  setFormValue({ role: Roles[e.target.value.toLocaleUpperCase()] });
                }}
              >
                {Object.values(Roles).map((role, index) => (
                  <option key={index} value={role}>
                    {role.slice(0, 1).toUpperCase() + role.slice(1)}
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
