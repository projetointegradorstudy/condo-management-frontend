import { X } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { ToastMessage } from './ToastNotifications';
import { Case } from '../interfaces';
import '../styles/mfa-modal.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import hideEmail from '../utils/hideEmail';
import { Label } from './Label';
import { Input } from './Input';
import { twoFactorAuth } from '../services/api';

export function MfaModal({ emailMfa }: { emailMfa: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const {
    isMfaEnabled,
    setIsMfaEnabled,
    isMfaAuthenticated,
    removeIsMfaAuthenticated,
    removeIsAuthenticated,
    removeEmail,
    removeToken,
    mfaSignin,
    setIsOpenConfirmSignoutModal,
    isOpenMfaModal,
    setIsOpenMfaModal,
    isSocialLogin,
    isMyselfData,
  } = getContext();

  const handleFieldChange = (e: ChangeEvent<any>) => {
    setToken(e.target.value.replace(/\D/g, ''));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const data = await mfaSignin({ email: emailMfa, token });

    if (!data.result) ToastMessage({ message: 'Código inválido ou expirado', type: Case.ERROR });

    setIsLoading(false);
    setIsOpenConfirmSignoutModal(false);
  };

  const handleCloser = () => {
    setIsMfaEnabled(false);
    removeIsMfaAuthenticated();
    removeIsAuthenticated();
    removeEmail();
    removeToken();
    setIsOpenMfaModal(false);
    setToken('');
  };

  useEffect(() => {
    if (token.length === 6) {
      handleSubmit();
    }
  }, [token]);

  if (!isSocialLogin && isMfaEnabled && !isMfaAuthenticated && isOpenMfaModal) {
    return (
      <div className="modal-mfa-background">
        <div className="modal-mfa">
          <div className="modal-mfa-button-close">
            <button className="modal-mfa-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-mfa-content">
            <div className="modal-mfa-message">
              <h4>Verificação em duas etapas</h4>
              {isMyselfData?.mfaOption?.appAuthenticator ? (
                <span>Insira o código exibido no seu app autenticador.</span>
              ) : (
                <span>
                  Enviamos um código para o e-mail
                  <strong> {hideEmail(emailMfa)}</strong>. Insira o código abaixo para prosseguir.
                </span>
              )}
            </div>

            <div className="">
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
    );
  }
  return null;
}
