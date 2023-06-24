import { FormEvent, useRef, useState } from 'react';
import { Users, X } from 'phosphor-react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { getContext } from '../utils/context-import';
import { Case, ICreateRequest, IResultRequest, dateTimeConfig } from '../interfaces';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { Label } from './Label';
import '../styles/request-modal.scss';
import { ToastMessage } from './ToastNotifications';
import { createEnvRequest } from '../services/api';

export function RequestModal() {
  const [isDate, setIsDate] = useState<any>();
  const { setIsNeedRefresh, isRequestModal, setIsRequestModal, handleInputErros, handleInputErrosClean } = getContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const [isFormValue, setIsFormValue] = useState<Partial<ICreateRequest>>();
  const newFormValues: Partial<ICreateRequest> = { ...isFormValue, environment_id: isRequestModal?.data.id };

  const setFormValue = (prop: Partial<ICreateRequest>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      if (!prop[key].length) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);
    handleGenerateDateOut();
    if (!validateDatefield()) {
      await createEnvRequest(newFormValues)
        .then(() => {
          ToastMessage({ message: 'Reserva realizada', type: Case.SUCCESS });
          setIsNeedRefresh(true);
        })
        .catch(() => {});
      cleanData();
      form?.reset();
    }
    setIsLoading(false);
  };

  const handleGenerateDateOut = () => {
    if (newFormValues.date_in && newFormValues.date_out) {
      const dateIn = new Date(newFormValues.date_in).getTime();
      const dateOut = dayjs(new Date(dateIn + +newFormValues.date_out).getTime()).format('YYYY-MM-DD HH:mm');
      newFormValues.date_out = dateOut;
    }
  };

  const validateDatefield = (): boolean => {
    if (!isDate) {
      ToastMessage({ message: 'Preencha todos os campos', type: Case.ERROR });
      return true;
    }
    return false;
  };

  const cleanData = () => {
    setIsRequestModal(undefined);
    setIsDate(undefined);
    setIsFormValue(undefined);
    setIsLoading(false);
  };

  const handleCloser = () => {
    setIsRequestModal(undefined);
    setIsResult(null);
    setIsLoading(false);
  };

  if (isRequestModal?.isOpen) {
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
              <h4>{isRequestModal.data.name}</h4>
              <div className="modal-request-info-capacity" title="Quantidade de pessoas">
                <Users size={20} />
                <strong>{isRequestModal.data.capacity}</strong>
              </div>
            </div>

            <div className="modal-request-image">
              <img src={isRequestModal.data.image} alt="image" />
              <span>{isRequestModal.data.description}</span>
            </div>
            <form onSubmit={handleSubmit} id="form">
              <Label title="Data e hora" htmlFor="date-time" />
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={dateTimeConfig[navigator.language].locale}>
                <MobileDateTimePicker
                  format={dateTimeConfig[navigator.language].format}
                  disablePast
                  minDate={dayjs().add(2, 'day')}
                  minutesStep={5}
                  maxDate={dayjs().add(6, 'months')}
                  ampm={false}
                  onChange={(value) => {
                    setIsDate(value);
                    setFormValue({ date_in: dayjs(value).format('YYYY-MM-DD HH:mm') });
                  }}
                  slotProps={{
                    textField: {
                      value: isDate,
                    },
                  }}
                />
              </LocalizationProvider>

              <Label title="Duração" htmlFor="duration" />
              <select
                defaultValue={''}
                required
                name="duration"
                onChange={(e) => {
                  setFormValue({ date_out: e.target.value });
                  handleInputErrosClean(e);
                }}
                onInvalid={handleInputErros}
              >
                <option disabled value="">
                  --
                </option>
                <option value="7200000">2 horas</option>
                <option value="10800000">3 horas</option>
                <option value="14400000">4 horas</option>
              </select>

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
