import { FormEvent, useState } from 'react';
import { Users, X } from 'phosphor-react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { getContext } from '../utils/context-import';
import { Case, ICreateRequest, IResultRequest, dateTimeConfig } from '../interfaces';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { Label } from './Label';
import { ToastMessage } from './ToastNotifications';
import { createEnvRequest } from '../services/api';
import { Select } from './Select';
import '../styles/request-modal.scss';

export function RequestModal() {
  const [hasError, setHasError] = useState({ date_in: false, date_out: false });
  const [formData, setFormData] = useState({ date_in: '', date_out: '' });
  const [errorMessage, setErrorMessage] = useState({ date_in: '', date_out: '' });
  const [isDate, setIsDate] = useState<any>();
  const { setIsNeedRefresh, isRequestModal, setIsRequestModal } = getContext();
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

  const handleFieldChange = (e: any) => {
    const field = e.target;
    setErrorMessage({ ...errorMessage, [field.name]: '' });
    setHasError({ ...hasError, [field.name]: false });
    setFormData({ ...formData, [field.name]: field.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFields()) return;
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);
    handleGenerateDateOut();

    await createEnvRequest({
      // image,
      date_in: formData.date_in,
      date_out: formData.date_out,
    })
      .then(() => {
        ToastMessage({ message: 'Reserva realizada', type: Case.SUCCESS });
        setIsNeedRefresh(true);
      })
      .catch(() => {});
    cleanData();
    form?.reset();

    setIsLoading(false);
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      date_in: !formData.date_in ? 'Campo obrigatório' : null,
      date_out: !formData.date_out ? 'Campo obrigatório' : null,
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
    if (newFormValues.date_in && newFormValues.date_out) {
      const dateIn = new Date(newFormValues.date_in).getTime();
      const dateOut = dayjs(new Date(dateIn + +newFormValues.date_out).getTime()).format('YYYY-MM-DD HH:mm');
      newFormValues.date_out = dateOut;
    }
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

              <Label title="Duração" htmlFor="date_out" />
              <Select
                className={hasError.date_out ? 'field-error' : ''}
                defaultValue={''}
                name="date_out"
                onChange={handleFieldChange}
                message={hasError.date_out ? errorMessage.date_out : undefined}
              />

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
