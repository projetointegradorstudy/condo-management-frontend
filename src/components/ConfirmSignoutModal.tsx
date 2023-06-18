import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import '../styles/confirm-signout-modal.scss';

export function ConfirmSignoutModal() {
  const { isOpenConfirmSignoutModal, setIsOpenConfirmSignoutModal, signout } = getContext();

  const handleSignout = () => {
    signout();
  };

  const handleCloser = () => {
    setIsOpenConfirmSignoutModal(false);
  };

  if (isOpenConfirmSignoutModal) {
    return (
      <div className="modal-confirm-signout-background">
        <div className="modal-confirm-signout">
          <div className="modal-confirm-signout-button-close">
            <button className="modal-confirm-signout-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-confirm-signout-content">
            <div className="modal-confirm-signout-message">
              <h4>Tem certeza que deseja sair?</h4>
            </div>

            <div className="modal-confirm-signout-content-form">
              <Button title="Cancelar" onClick={handleCloser} isCancel />
              <Button title="Confirmar" isConfirm onClick={handleSignout} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
