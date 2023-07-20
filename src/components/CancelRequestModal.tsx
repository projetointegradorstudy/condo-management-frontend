import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { Case, ICancelRequest, ReservationStatus } from '../interfaces';
import { ToastMessage } from './ToastNotifications';
import { updateEnvReservation } from '../services/api';
import '../styles/cancel-request-modal.scss';

export function CancelRequestModal({ id, index }: ICancelRequest) {
  const { isOpenCancelRequestModal, setIsOpenCancelRequestModal, setIsNeedRefresh } = getContext();

  const handleClick = async () => {
    await updateEnvReservation(id, { status: ReservationStatus.CANCELLED })
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Reserva cancelada', type: Case.SUCCESS });
        return;
      })
      .catch(() => {});
  };

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
                Tem certeza que deseja{' '}
                <span>
                  <strong>cancelar</strong>
                </span>{' '}
                a reserva número: <strong>#{index}</strong>?
              </h4>
            </div>

            <div className="modal-cancel-content-form">
              <Button title="Cancelar" isCancel onClick={handleCloser} />
              <Button title="Confirmar" isConfirm onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
