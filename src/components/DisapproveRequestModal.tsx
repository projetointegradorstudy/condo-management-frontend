import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import '../styles/disapprove-request-modal.scss';

export function DisapproveRequestModal() {
  const { isOpenDisapproveRequestModal, setIsOpenDisapproveRequestModal } = getContext();

  const handleCloser = () => {
    setIsOpenDisapproveRequestModal(false);
  };

  if (isOpenDisapproveRequestModal) {
    return (
      <div className="modal-disapprove-background">
        <div className="modal-disapprove">
          <div className="modal-disapprove-button-close">
            <button className="modal-disapprove-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-disapprove-content">
            <div className="modal-disapprove-message">
              <h4>
                Tem certeza que deseja recusar:
                <br />
                <strong>name</strong>?
              </h4>
            </div>

            <div className="modal-disapprove-content-form">
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
