import { Footer } from '../components/Footer';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { getContext } from '../utils/context-import';
import { CheckCircle, PencilSimple } from 'phosphor-react';
import { InputPassword } from '../components/InputPassword';
import { Button } from '../components/Button';
import { useState } from 'react';
import { IEditUser, IResultRequest, editMyselUserfMessages } from '../interfaces';
import { updateUser } from '../services/api';
import '../styles/edit-profile.scss';

export function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const [isFormValue, setIsFormValue] = useState<Partial<IEditUser>>();
  const newFormValues: Partial<IEditUser> = { ...isFormValue };
  const { isMyselfData, setIsNeedRefresh } = getContext();

  const setFormValue = (prop: Partial<IEditUser>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      if (!prop[key].length) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    await updateUser(newFormValues)
      .then((res) => {
        if (res.status === 200) {
          setIsResult({
            message: editMyselUserfMessages[res.statusText],
            icon: <CheckCircle color="#38ba7c" />,
          });
          setTimeout(() => {
            setIsResult(null);
          }, 3000);
          setIsNeedRefresh(true);
          return;
        }
      })
      .catch(() => {});
    setIsLoading(false);
  };

  return (
    <>
      <div className="page-edit-profile">
        <Sidebar />
        <NavbarMobile />
        <div className="container-edit-profile">
          <div className="content-edit-profile-title">
            <h2>Editar perfil</h2>
          </div>

          <div className="content-edit-profile">
            {!isResult && (
              <>
                <div className="content-edit-profile-avatar">
                  <img src={isMyselfData?.avatar} />
                  <Label htmlFor="image" isUploadFile icon={<PencilSimple />} />
                  <Input title="Choose a file" type="file" name="image" id="image" accept=".png, .jpg" hidden />
                </div>
                <div className="content-dit-profile-form">
                  <h3>Suas informações</h3>
                  <form onSubmit={handleSubmit}>
                    <Label title="Nome" htmlFor="name" />
                    <Input
                      name="name"
                      id="name"
                      type="text"
                      placeholder={isMyselfData?.name}
                      onChange={(e) => setFormValue({ name: e.target.value })}
                    />

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

                    <div className="content-edit-profile-button">
                      <Button title="Confirmar" type="submit" isConfirm />
                    </div>
                  </form>
                </div>
              </>
            )}
            {isResult && (
              <div className="edit-user-feedback">
                {isResult.icon}

                <span>{isResult.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
