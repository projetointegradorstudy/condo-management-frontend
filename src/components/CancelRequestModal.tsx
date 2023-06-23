import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import '../styles/cancel-request-modal.scss';
import { ICancelRequest } from '../interfaces';

export function CancelRequestModal({ id, name }: ICancelRequest) {
  const { isOpenCancelRequestModal, setIsOpenCancelRequestModal } = getContext();

  const handleCloser = () => {
    setIsOpenCancelRequestModal(false);
  };

  if (isOpenCancelRequestModal) {
    return (
      <div className="modal-cancel-background">
        <div className="modal-cancel">
          <div className="modal-cancel-button-close">
            <button className="modal-cancel-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-cancel-content">
            <div className="modal-cancel-message">
              <h4>
                Tem certeza que deseja cancelar:
                <br />
                <strong>{name}</strong>?
              </h4>
            </div>

            <div className="modal-cancel-content-form">
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
