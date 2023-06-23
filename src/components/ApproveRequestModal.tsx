import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import '../styles/approve-request-modal.scss';

export function ApproveRequestModal() {
  const { isOpenApproveRequestModal, setIsOpenApproveRequestModal } = getContext();

  const handleCloser = () => {
    setIsOpenApproveRequestModal(false);
  };

  if (isOpenApproveRequestModal) {
    return (
      <div className="modal-approve-background">
        <div className="modal-approve">
          <div className="modal-approve-button-close">
            <button className="modal-approve-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-approve-content">
            <div className="modal-approve-message">
              <h4>
                Tem certeza que deseja aprovar:
                <br />
                <strong>name</strong>?
              </h4>
            </div>

            <div className="modal-approve-content-form">
              <Button title="Cancelar" isCancel onClick={handleCloser} />
              <Button title="Confirmar" isConfirm />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
