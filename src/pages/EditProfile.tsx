import { Footer } from '../components/Footer';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { getContext } from '../utils/context-import';
import { PencilSimple } from 'phosphor-react';
import { InputPassword } from '../components/InputPassword';
import { Button } from '../components/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import avatarDefault from '../assets/avatar-default.png';
import { Case, IEditUser } from '../interfaces';
import { updateUser } from '../services/api';
import { ToastMessage, ToastNotifications } from '../components/ToastNotifications';
import '../styles/edit-profile.scss';

export function EditProfile() {
  const [previewImage, setPreviewImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValue, setIsFormValue] = useState<Partial<IEditUser>>();
  const newFormValues: Partial<IEditUser> = { ...isFormValue };
  const { isMyselfData, setIsNeedRefresh } = getContext();

  const setFormValue = (prop: Partial<IEditUser>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      if (!prop[key]) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);

    await updateUser(newFormValues)
      .then(() => {
        ToastMessage({ message: 'Alterações salvas', type: Case.SUCCESS });
        setIsNeedRefresh(true);
      })
      .catch(() => {});
    form?.reset();
    cleanData();
  };

  const cleanData = () => {
    setIsFormValue(undefined);
    setPreviewImage(undefined);
    setIsLoading(false);
  };

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormValue({ avatar: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            <div className="content-edit-profile-avatar">
              <img src={previewImage || isMyselfData?.avatar || avatarDefault} />
              <Label htmlFor="image" isEditAvatar icon={<PencilSimple />} />
              <Input
                title="Choose a file"
                type="file"
                name="image"
                id="image"
                accept=".png, .jpg"
                hidden
                onChange={(e) => {
                  handleImagePreview(e);
                }}
                isNotRequired
                isUploadFile
              />
            </div>
            <div className="content-dit-profile-form">
              <h3>Suas informações</h3>
              <form onSubmit={handleSubmit} id="form">
                <Label title="Nome" htmlFor="name" />
                <Input
                  name="name"
                  id="name"
                  type="text"
                  maxLength={30}
                  placeholder={isMyselfData?.name}
                  onChange={(e) => setFormValue({ name: e.target.value })}
                  isNotRequired
                />

                <Label title="Senha" htmlFor="password" />
                <InputPassword
                  name="password"
                  id="password"
                  placeholder="********"
                  autoComplete="on"
                  maxLength={30}
                  onChange={(e) => setFormValue({ password: e.target.value })}
                ></InputPassword>

                <Label title="Confirmar senha" htmlFor="password-confirmation" />
                <InputPassword
                  name="password-confirmation"
                  id="password-confirmation"
                  placeholder="********"
                  autoComplete="on"
                  maxLength={30}
                  onChange={(e) => setFormValue({ passwordConfirmation: e.target.value })}
                  isNotRequired
                />

                <div className="content-edit-profile-button">
                  <Button title="Confirmar" type="submit" isConfirm />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastNotifications />
      <Footer isFull />
    </>
  );
}
