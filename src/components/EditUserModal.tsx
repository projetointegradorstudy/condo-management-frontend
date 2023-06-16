import { useState } from 'react';
import { X } from 'phosphor-react';
import Select from 'react-select';
import { IEditUserModal, Roles } from '../interfaces';
import { adminUpdateUser } from '../services/api';
import { getContext } from '../utils/context-import';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { InputPassword } from './InputPassword';
import avatarDefault from '../assets/avatar-default.png';
import '../styles/edit-user-modal.scss';

export function EditUserModal({ id, avatar, password, passwordConfirmation, created_at, role }: IEditUserModal) {
  const { isOpenEditModal, setIsOpenEditModal, formatDate, setIsNeedRefresh } = getContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isRoleField, setIsRoleField] = useState<Partial<IEditUserModal>>({
    role,
  });
  const [isFormValue, setIsFormValue] = useState<Partial<IEditUserModal>>();
  const newFormValues: Partial<IEditUserModal> = { ...isFormValue };

  const setFormValue = (prop: Partial<IEditUserModal>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      if (!prop[key].length) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    await adminUpdateUser(id, newFormValues)
      .then((res) => {
        console.log(res);
        // if (res.status === 201) {
        //   setIsResult({ message: createUserMessages[res.data.message], icon: <CheckCircle /> });
        //   setIsNeedRefresh(true);
        //   return;
        // }
        setIsNeedRefresh(true);
      })
      .catch(() => {});
    setIsLoading(false);
  };

  const option = Object;

  if (isOpenEditModal) {
    return (
      <div className="modal-edit-user-background">
        <div className="modal-edit-user">
          <div className="modal-edit-user-button-close">
            <button className="modal-edit-user-button-default" onClick={() => setIsOpenEditModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-edit-user-content">
            <div className="modal-edit-user-image">
              <img src={avatar ? avatar : avatarDefault} alt="avatar" />
            </div>
            <form onSubmit={handleSubmit}>
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

              <Label title="Registrado" htmlFor="register" />
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
                <Button title="Cancelar" onClick={() => setIsOpenEditModal(false)} isCancel />
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
