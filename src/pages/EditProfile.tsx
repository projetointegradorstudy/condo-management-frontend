import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { getContext } from '../utils/context-import';
import { PencilSimple, Trash } from 'phosphor-react';
import { InputPassword } from '../components/InputPassword';
import { Button } from '../components/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import avatarDefault from '../assets/avatar-default.png';
import { Case, IEditUser, IMfaOption } from '../interfaces';
import { enableTwoFactorAuth, updateUser } from '../services/api';
import { ToastMessage, ToastNotifications } from '../components/ToastNotifications';
import Switch from '@mui/material/Switch';
import '../styles/edit-profile.scss';
import { TwoFactorAuthModal } from '../components/TwoFactorAuthModal';

export function EditProfile() {
  const { isMyselfData, setIsNeedRefresh } = getContext();
  const [isOpenModalTwoFactor, setIsOpenModalTwoFactor] = useState<boolean>(false);
  const [isQrCode, setIsQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(isMyselfData?.mfaOption?.email || false);
  const [isCheckedAppAuth, setIsCheckedAppAuth] = useState(isMyselfData?.mfaOption?.appAuthenticator || false);
  const [isFormValue, setIsFormValue] = useState<Partial<IEditUser>>();
  const [previewImage, setPreviewImage] = useState<string | undefined>(isMyselfData?.avatar);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleSwitchChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const tempMfaOption: IMfaOption = isFormValue?.mfaOption
      ? { ...isFormValue?.mfaOption }
      : isMyselfData?.mfaOption
      ? { ...isMyselfData?.mfaOption }
      : { email: false, appAuthenticator: false };
    if (event?.target?.name === 'email-mfa') {
      setIsCheckedEmail(event.target.checked);
      tempMfaOption.email = event.target.checked;
      setIsChanged(true);
    } else {
      tempMfaOption.appAuthenticator = !isCheckedAppAuth;
      setIsChanged(true);
    }

    setIsFormValue({ ...isFormValue, mfaOption: { ...tempMfaOption } });
  };

  const handleSwitchTwoFactorAuth = async () => {
    if (!isCheckedAppAuth) {
      const result = await enableTwoFactorAuth()
        .then((res) => res)
        .catch((e) => e);
      if (!(result.status === 200)) ToastMessage({ message: 'Algo deu errado, tente novamente', type: Case.ERROR });

      setIsQrCode(result.data);
      setIsOpenModalTwoFactor(!isOpenModalTwoFactor);
    } else {
      setIsCheckedAppAuth(!isCheckedAppAuth);
      handleSwitchChange();
    }
  };

  const twoFactorWasEnabled = (value: boolean) => {
    setIsCheckedAppAuth(value);
    handleSwitchChange();
    setIsOpenModalTwoFactor(!isOpenModalTwoFactor);
    setIsQrCode('');
  };

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
                  src={
                    isMyselfData?.avatar ? isMyselfData?.avatar : previewImage?.length ? previewImage : avatarDefault
                  }
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

              <Label htmlFor="image" isEditAvatar icon={<PencilSimple weight="bold" />} />
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

                <Label title="Email" htmlFor="email" />
                <Input name="email" id="email" type="text" placeholder={isMyselfData?.email} disabled />

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

                <div>
                  <h3>Autenticação multifator</h3>
                  <div className="switch-button-container">
                    <div className="switch-button">
                      <Label title="Email" htmlFor="email-mfa" />
                      <Switch
                        name="email-mfa"
                        checked={isCheckedEmail}
                        onChange={handleSwitchChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                    <div className="switch-button">
                      <Label title="App autenticador" htmlFor="appAuth-mfa" />
                      <Switch
                        name="appAuth-mfa"
                        checked={isCheckedAppAuth}
                        onChange={handleSwitchTwoFactorAuth}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="content-edit-profile-button">
                  <Button title="Confirmar" type="submit" isConfirm disabled={isChangedData()} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastNotifications />
      <TwoFactorAuthModal
        emailTwoFactorEmail={isMyselfData?.email || ''}
        isOpen={isOpenModalTwoFactor}
        isQrcodeValue={isQrCode}
        twoFactorSuccess={twoFactorWasEnabled}
      />
    </>
  );
}
