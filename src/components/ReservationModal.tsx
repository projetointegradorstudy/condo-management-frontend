import { FormEvent, useState } from 'react';
import { Users, X } from 'phosphor-react';
import dayjs from 'dayjs';
import { getContext } from '../utils/context-import';
import { Case, ICreateReservation } from '../interfaces';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { Label } from './Label';
import { ToastMessage } from './ToastNotifications';
import { createEnvReservation } from '../services/api';
import { Select } from './Select';
import { DateTimePicker } from './DateTimePicker';
import '../styles/reservation-modal.scss';

export function ReservationModal() {
  const [hasError, setHasError] = useState({ date_in: false, date_out: false });
  const { setIsNeedRefresh, isReservationModal, setIsReservationModal } = getContext();
  const [formData, setFormData] = useState<Partial<ICreateReservation>>();
  const [errorMessage, setErrorMessage] = useState<Partial<ICreateReservation>>({
    date_in: '',
    date_out: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (e: any) => {
    const field = e.target;
    if (!field) {
      setFormData({ ...formData, ['date_in']: e.date_in });
      setErrorMessage({ ...errorMessage, ['date_in']: '' });
      setHasError({ ...hasError, ['date_in']: false });
    } else {
      setFormData({ ...formData, [field.name]: field.value });
      setErrorMessage({ ...errorMessage, [field.name]: '' });
      setHasError({ ...hasError, [field.name]: false });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFields()) return;
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);
    handleGenerateDateOut();
    if (formData) {
      await createEnvReservation({ ...formData, environment_id: isReservationModal?.data.id })
        .then(() => {
          ToastMessage({ message: 'Reserva realizada', type: Case.SUCCESS });
          setIsNeedRefresh(true);
        })
        .catch(() => {});
      handleCloser();
      form?.reset();
    }
    setIsLoading(false);
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      date_in: !formData?.date_in ? 'Campo obrigatório' : null,
      date_out: !formData?.date_out ? 'Campo obrigatório' : null,
    };
    for (const field in errors) {
      if (errors[field]) {
        tempMessage[field] = errors[field];
        tempError[field] = true;
        hasTempError = true;
      }
    }
    setErrorMessage({ ...errorMessage, ...tempMessage });
    setHasError({ ...hasError, ...tempError });
    return hasTempError;
  };

  const handleGenerateDateOut = () => {
    if (formData?.date_in && formData?.date_out) {
      const dateIn = new Date(formData?.date_in).getTime();
      const dateOut = dayjs(new Date(dateIn + +formData?.date_out).getTime()).format('YYYY-MM-DD HH:mm');
      formData.date_out = dateOut;
    }
  };

  const cleanMyObject = (targetObject: any) => {
    Object.values(targetObject).forEach((value, index) => {
      targetObject[Object.keys(targetObject)[index]] = '';
    });
  };

  const handleCloser = () => {
    cleanMyObject(errorMessage);
    cleanMyObject(hasError);
    setIsReservationModal(undefined);
    setFormData(undefined);
    setIsLoading(false);
  };

  if (isReservationModal?.isOpen) {
    return (
      <div className="modal-request-background">
        <div className="modal-request">
          <div className="modal-request-button-close">
            <button className="modal-request-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}
          <div className="modal-request-content">
            <div className="modal-request-info">
              <h4>{isReservationModal.data.name}</h4>
              <div className="modal-request-info-capacity" title="Quantidade de pessoas">
                <Users size={20} />
                <strong>{isReservationModal.data.capacity}</strong>
              </div>
            </div>

            <div className="modal-request-image">
              <img src={isReservationModal.data.image} alt="image" />
              <span>{isReservationModal.data.description}</span>
            </div>
            <form onSubmit={handleSubmit} id="form">
              <Label title="Data e hora" htmlFor="date_in" />
              <DateTimePicker
                name="date_in"
                onChangeDate={handleFieldChange}
                message={hasError.date_in ? errorMessage.date_in : undefined}
                hasError={hasError.date_in}
              />

              <Label title="Duração" htmlFor="date_out" />
              <Select
                id="date_out"
                className={hasError.date_out ? 'field-error' : ''}
                defaultValue={''}
                name="date_out"
                onChange={handleFieldChange}
                message={hasError.date_out ? errorMessage.date_out : undefined}
              ></Select>

              <div className="modal-request-form-button">
                <Button title="Cancelar" onClick={handleCloser} isCancel />
                <Button title="Confirmar" type="submit" isConfirm />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
