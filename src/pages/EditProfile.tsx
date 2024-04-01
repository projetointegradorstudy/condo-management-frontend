import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { PencilSimple, Trash } from 'phosphor-react';
import { InputPassword } from '../components/InputPassword';
import { Button } from '../components/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import avatarDefault from '../assets/avatar-default.png';
import { Case, IEditUser } from '../interfaces';
import { updateUser } from '../services/api';
import { ToastMessage, ToastNotifications } from '../components/ToastNotifications';
import '../styles/edit-profile.scss';

export function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValue, setIsFormValue] = useState<Partial<IEditUser>>();
  const { isMyselfData, setIsNeedRefresh } = getContext();
  const [previewImage, setPreviewImage] = useState<string | undefined>(isMyselfData?.avatar);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleFieldChange = (e: ChangeEvent<any>) => {
    const field = e.target;
    const file = field.files?.[0];
    if (file) {
      setIsFormValue({ ...isFormValue, avatar: file });
      setIsChanged(true);
    } else {
      setIsFormValue({ ...isFormValue, [field.name]: field.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);
    if (isFormValue) {
      await updateUser(isFormValue)
        .then(() => {
          ToastMessage({ message: 'Alterações salvas', type: Case.SUCCESS });
          setIsNeedRefresh(true);
        })
        .catch(() => {});
    }
    form?.reset();
    cleanData();
  };

  const cleanData = () => {
    setIsChanged(false);
    setIsFormValue(undefined);
    setIsLoading(false);
  };

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isChangedData = (): boolean => {
    return !isFormValue?.name && !isFormValue?.password && !isChanged;
  };

  return (
    <>
      <div className="page-edit-profile">
        <div className="container-edit-profile">
          <div className="content-edit-profile-title">
            <h1>Editar perfil</h1>
          </div>

          <div className="content-edit-profile">
            <div className="content-edit-profile-avatar">
              <div className="image-upload-edit-user-preview">
                <img
                  className="preview"
                  src={previewImage?.length ? previewImage : avatarDefault}
                  alt="Sua foto de perfil"
                />

                <div className="button-upload-edit-user-preview">
                  <div className="content-button" style={{ display: previewImage?.length ? 'block' : 'none' }}>
                    <button
                      className="trash"
                      onClick={() => {
                        setIsFormValue({ avatar: '' });
                        setIsChanged(true);
                        setPreviewImage(undefined);
                      }}
                    >
                      <Trash />
                      Excluir foto
                    </button>
                  </div>
                </div>
              </div>

              <Label htmlFor="image" isEditAvatar icon={<PencilSimple />} />
              <Input
                title="Choose a file"
                type="file"
                name="image"
                id="image"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => {
                  handleFieldChange(e);
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
                  placeholder={isMyselfData?.name}
                  onChange={handleFieldChange}
                  isNotRequired
                />

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
                  isNotRequired
                />

                <div className="content-edit-profile-button">
                  <Button title="Confirmar" type="submit" isConfirm disabled={isChangedData()} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastNotifications />
    </>
  );
}
