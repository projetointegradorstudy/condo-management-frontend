import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { ToastMessage } from './ToastNotifications';
import { Case, IApproveReservation, ReservationStatus } from '../interfaces';
import { updateEnvReservation } from '../services/api';
import '../styles/approve-reservation-modal.scss';

export function ApproveReservationModal({ id, index }: IApproveReservation) {
  const { isOpenApproveReservationModal, setIsOpenApproveReservationModal, setIsNeedRefresh } = getContext();

  const handleClick = async () => {
    await updateEnvReservation(id, { status: ReservationStatus.APPROVED })
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Reserva aprovada', type: Case.SUCCESS });
        return;
      })
      .catch(() => {});
  };

  const handleCloser = () => {
    setIsOpenApproveReservationModal(false);
  };

  if (isOpenApproveReservationModal) {
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
                Tem certeza que deseja{' '}
                <span>
                  <strong>aprovar</strong>
                </span>{' '}
                a reserva número: <strong>#{index}</strong>?
              </h4>
            </div>

            <div className="modal-approve-content-form">
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
