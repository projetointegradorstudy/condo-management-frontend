import { useState } from 'react';
import { X } from 'phosphor-react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IEnvironment, IResultRequest } from '../interfaces';
import { Button } from './Button';
import { Spinner } from './Spinner';
import '../styles/request-modal.scss';
import { Label } from './Label';
import { Input } from './Input';

export function RequestModal() {
  const { isOpenRequestModal, setIsOpenRequestModal } = getContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   await adminUpdateUser(id, newFormValues)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setIsResult({
  //           message: editUserMessages[res.statusText],
  //           icon: <CheckCircle color="#38ba7c" />,
  //         });
  //         setIsNeedRefresh(true);
  //         return;
  //       }
  //     })
  //     .catch(() => {});
  //   setIsLoading(false);
  // };

  const handleCloser = () => {
    setIsOpenRequestModal(false);
    setIsResult(null);
    setIsLoading(false);
  };

  if (isOpenRequestModal) {
    return (
      <div className="modal-request-background">
        <div className="modal-request">
          <div className="modal-request-button-close">
            <button className="modal-request-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}
          {!isResult && (
            <div className="modal-request-content">
              <h4>Ambiente</h4>
              <div className="modal-request-image">
                <img
                  src="https://www.casadevalentina.com.br/wp-content/uploads/2019/11/Sal%C3%A3oDeFestas_CasaDeValentina-6.jpg.optimal.jpg"
                  alt="image"
                />
              </div>
              <form>
                <Label title="Data e hora" htmlFor="date-time" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                </LocalizationProvider>

                <Label title="Capacidade" htmlFor="capacity" />
                <Input name="capacity" id="capacity" type="number" placeholder="20" />

                <div className="modal-request-form-button">
                  <Button title="Cancelar" onClick={handleCloser} isCancel />
                  <Button title="Confirmar" type="submit" isConfirm />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
