import { X } from 'phosphor-react';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { Case, IDisapproveReservation, ReservationStatus } from '../interfaces';
import { ToastMessage } from './ToastNotifications';
import { updateEnvReservation } from '../services/api';
import '../styles/disapprove-reservation-modal.scss';

export function DisapproveReservationModal({ id, index }: IDisapproveReservation) {
  const { isOpenDisapproveReservationModal, setIsOpenDisapproveReservationModal, setIsNeedRefresh } = getContext();

  const handleClick = async () => {
    await updateEnvReservation(id, { status: ReservationStatus.NOT_APPROVED })
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Reserva recusada', type: Case.SUCCESS });
        return;
      })
      .catch(() => {});
  };

  const handleCloser = () => {
    setIsOpenDisapproveReservationModal(false);
  };

  if (isOpenDisapproveReservationModal) {
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
                Tem certeza que deseja{' '}
                <span>
                  <strong>recusar</strong>
                </span>{' '}
                a reserva número: <strong>#{index}</strong>?
              </h4>
            </div>

            <div className="modal-disapprove-content-form">
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
