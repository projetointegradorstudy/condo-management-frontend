import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { X, Image, Trash } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { createEnvironment } from '../services/api';
import { getContext } from '../utils/context-import';
import { Spinner } from './Spinner';
import { Case, ICreateEnvironment, IResultRequest } from '../interfaces';
import { ToastMessage } from '../components/ToastNotifications';
import { TextArea } from './TextArea';
import '../styles/create-environment-modal.scss';

export function CreateEnvironmentModal() {
  const [hasError, setHasError] = useState({ name: false, capacity: false, description: false });
  const [formData, setFormData] = useState<Partial<ICreateEnvironment>>();
  const [errorMessage, setErrorMessage] = useState<Partial<ICreateEnvironment>>({
    name: '',
    capacity: '',
    description: '',
  });
  const [previewImage, setPreviewImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const { isOpenCreateEnvironmentModal, setIsOpenCreateEnvironmentModal, setIsNeedRefresh } = getContext();

  const handleFieldChange = (e: ChangeEvent<any>) => {
    const field = e.target;
    const file = field.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [field.name]: field.value });
    }
    setErrorMessage({ ...errorMessage, [field.name]: '' });
    setHasError({ ...hasError, [field.name]: false });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    if (checkFields()) return;
    setIsLoading(true);
    if (formData) {
      await createEnvironment(formData)
        .then(() => {
          handleCloser();
          setIsNeedRefresh(true);
          ToastMessage({ message: 'Ambiente criado', type: Case.SUCCESS });
        })
        .catch(() => {});
    }
    form?.reset();
    cleanData();
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      name: !formData?.name ? 'Campo obrigatório' : null,
      capacity: !formData?.capacity ? 'Campo obrigatório' : null,
      description: !formData?.description ? 'Campo obrigatório' : null,
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

  useEffect(() => {}, [isResult, isLoading, formData]);

  const cleanData = () => {
    setFormData(undefined);
    setPreviewImage(undefined);
    setIsLoading(false);
  };

  const cleanMyObject = (targetObject: any) => {
    Object.values(targetObject).forEach((value, index) => {
      targetObject[Object.keys(targetObject)[index]] = '';
    });
  };

  const handleCloser = () => {
    cleanMyObject(errorMessage);
    cleanMyObject(hasError);
    setIsOpenCreateEnvironmentModal(false);
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

  if (isOpenCreateEnvironmentModal) {
    return (
      <div className="modal-create-environment-background">
        <div className="modal-create-environment">
          <div className="modal-create-environment-button-close">
            <button className="modal-create-environment-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>

          {isLoading && <Spinner />}
          <div className="modal-create-environment-content">
            <div className="modal-create-environment-title">
              <h4>Adicionar ambiente</h4>
            </div>

            <div className="modal-create-environment-content-form">
              <form onSubmit={handleSubmit} id="form">
                <div className="content-upload-register-environment">
                  <p>Imagem</p>
                  {!previewImage ? (
                    <div className="image-upload-register-environment">
                      <div className="button-upload-register-environment">
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
                    <div className="image-upload-register-environment-preview">
                      <img src={previewImage} alt="Preview" />
                      <div className="button-upload-register-environment-preview">
                        <Trash />
                        <button className="trash" onClick={() => setPreviewImage(undefined)}>
                          Excluir foto
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <Label title="Nome" htmlFor="name" />
                <Input
                  className={hasError.name ? 'field-error' : ''}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Ex: Piscina"
                  onChange={handleFieldChange}
                  message={hasError.name ? errorMessage.name : undefined}
                />

                <Label title="Capacidade" htmlFor="capacity" />
                <Input
                  className={hasError.capacity ? 'field-error' : ''}
                  name="capacity"
                  id="capacity"
                  type="number"
                  placeholder="Ex: 18"
                  onChange={handleFieldChange}
                  message={hasError.capacity ? errorMessage.capacity : undefined}
                />

                <Label title="Descrição" htmlFor="description" />
                <TextArea
                  className={hasError.description ? 'field-error' : ''}
                  name="description"
                  id="description"
                  placeholder="..."
                  onChange={handleFieldChange}
                  message={hasError.description ? errorMessage.description : undefined}
                />
                <div className="modal-create-environment-form-button">
                  <Button title="Cancelar" onClick={handleCloser} isCancel />
                  <Button title="Confirmar" type="submit" isConfirm />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
