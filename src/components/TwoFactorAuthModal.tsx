import { X } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import '../styles/twofa-modal.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { Label } from './Label';
import { Input } from './Input';
import { twoFactorCodeValidator } from '../services/api';
import { Case } from '../interfaces';
import { ToastMessage, ToastNotifications } from './ToastNotifications';

export function TwoFactorAuthModal({
  emailTwoFactorEmail,
  isOpen,
  isQrcodeValue,
  twoFactorSuccess,
}: {
  emailTwoFactorEmail: string;
  isOpen: boolean;
  isQrcodeValue: string;
  twoFactorSuccess: (value: boolean) => void;
}) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<string>(emailTwoFactorEmail);
  const [isQrCode, setIsQrCode] = useState<string>(isQrcodeValue);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const {
    setIsMfaEnabled,
    removeIsMfaAuthenticated,
    removeIsAuthenticated,
    removeEmail,
    removeToken,
    mfaSignin,
    setIsOpenConfirmSignoutModal,
    setIsOpenMfaModal,
  } = getContext();

  const handleFieldChange = (e: ChangeEvent<any>) => {
    setToken(e.target.value.replace(/\D/g, ''));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await twoFactorCodeValidator({ email: emailTwoFactorEmail, token })
      .then(() => {
        ToastMessage({ message: 'Validado com sucesso', type: Case.SUCCESS });
        setIsOpenModal(false);
        twoFactorSuccess(true);
      })
      .catch(() => {
        ToastMessage({ message: 'Código inválido ou expirado', type: Case.ERROR });
        twoFactorSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloser = () => {
    // setIsMfaEnabled(false);
    // removeIsMfaAuthenticated();
    // removeIsAuthenticated();
    // removeEmail();
    // removeToken();
    setIsOpenModal(false);
    setToken('');
  };

  useEffect(() => {
    if (token.length === 6) {
      handleSubmit();
    }
  }, [token]);

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsQrCode(isQrcodeValue);
  }, [isQrcodeValue]);

  if (isOpenModal) {
    return (
      <>
        <div className="modal-2fa-background">
          <div className="modal-2fa">
            <div className="modal-2fa-button-close">
              <button className="modal-2fa-button-default" onClick={handleCloser}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-2fa-content">
              <div className="modal-2fa-message">
                <h4>Autenticação em dois fatores</h4>
                <div className="qr-code">
                  <img src={isQrCode} alt="QrCode" />
                </div>
                <span>
                  Escaneie o QRCode e digite abaixo o código gerado pelo seu aplicativo autenticador para prosseguir com
                  a ativação.
                </span>
              </div>

              <div className="input-container">
                <Label title="Código" htmlFor="token" />
                <Input
                  name="token"
                  id="token"
                  type="text"
                  value={token}
                  placeholder="Insira o seu código"
                  onChange={handleFieldChange}
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastNotifications />
      </>
    );
  }
  return null;
}
