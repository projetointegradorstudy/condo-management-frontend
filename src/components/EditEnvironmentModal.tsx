import { X, Image, Trash } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { Case, EnvironmentStatus, IEditEnvironment, IResultReservation, handleStatus } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { updateEnvironment } from '../services/api';
import { Spinner } from './Spinner';
import { ToastMessage } from '../components/ToastNotifications';
import { TextArea } from './TextArea';
import '../styles/edit-environment-modal.scss';

export function EditEnvironmentModal({ id, name, description, image, capacity, status }: IEditEnvironment) {
  const [previewImage, setPreviewImage] = useState<string>();
  const { isOpenEditModal, setIsOpenEditModal, setIsNeedRefresh } = getContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultReservation | null>(null);
  const [isFormValue, setIsFormValue] = useState<Partial<IEditEnvironment>>();

  const handleFieldChange = (e: ChangeEvent<any>) => {
    const field = e.target;
    const file = field.files?.[0];
    if (file) {
      setIsFormValue({ ...isFormValue, image: file });
    } else {
      setIsFormValue({ ...isFormValue, [field.name]: field.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    setIsLoading(true);
    if (isFormValue) {
      await updateEnvironment(id, isFormValue)
        .then(() => {
          handleCloser();
          setIsNeedRefresh(true);
          ToastMessage({ message: 'Ambiente atualizado', type: Case.SUCCESS });
        })
        .catch(() => {});
    }
    form?.reset();
    cleanData();
  };

  useEffect(() => {}, [isResult, isLoading, isFormValue]);

  const cleanData = () => {
    setIsResult(null);
    setIsFormValue(undefined);
    setPreviewImage(undefined);
    setIsLoading(false);
  };

  const handleCloser = () => {
    setIsOpenEditModal(false);
    cleanData();
  };

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isOpenEditModal) {
    return (
      <div className="modal-edit-background-environment">
        <div className={!isResult ? 'modal-edit-environment' : 'modal-edit-environment-feedback'}>
          <div className="modal-button-close-environment">
            <button className="modal-button-default-environment" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}
          <div className="modal-edit-environment-content">
            <form onSubmit={handleSubmit} id="form">
              <div className="modal-content-upload-environment">
                <p>Imagem</p>
                {!previewImage ? (
                  <div className="modal-image-upload-environment">
                    <img src={typeof image === 'string' ? image : imageDefault} />
                    <div className="modal-button-upload-environment">
                      <Image />
                      <Label title="Escolher foto" htmlFor="image" isUploadFile />
                      <Input
                        type="file"
                        name="image"
                        id="image"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={(e) => {
                          handleFieldChange(e);
                          handleImagePreview(e);
                        }}
                        isNotRequired
                        isUploadFile
                      />
                    </div>
                  </div>
                ) : (
                  <div className="image-upload-edit-environment-preview">
                    <img className="preview" src={previewImage} alt="Preview" />
                    <div className="button-upload-edit-environment-preview">
                      <button className="trash" onClick={() => setPreviewImage(undefined)}>
                        <Trash />
                        Excluir foto
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Label title="Nome" htmlFor="name" />
              <Input name="name" id="name" type="text" placeholder={name} onChange={handleFieldChange} />

              <Label title="Capacidade" htmlFor="capacity" />
              <Input name="capacity" id="capacity" type="text" placeholder={capacity} onChange={handleFieldChange} />

              <Label title="Status" htmlFor="status" />
              <select value={isFormValue?.status || status} name="status" onChange={handleFieldChange}>
                {Object.values(EnvironmentStatus).map((optStatus, index) => (
                  <option key={index} value={optStatus}>
                    {handleStatus[optStatus].value}
                  </option>
                ))}
              </select>

              <Label title="Descrição" htmlFor="description" />
              <TextArea
                name="description"
                id="description"
                placeholder={description}
                maxLength={150}
                onChange={handleFieldChange}
              />

              <div className="modal-form-button-environment">
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
