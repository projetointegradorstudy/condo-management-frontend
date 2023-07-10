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
  const [hasError, setHasError] = useState({ image: false, name: false, capacity: false, description: false });
  const [formData, setFormData] = useState({ image: File, name: '', capacity: '', description: '' });
  const [errorMessage, setErrorMessage] = useState({ image: File, name: '', capacity: '', description: '' });
  const [previewImage, setPreviewImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const {
    isOpenCreateEnvironmentModal,
    setIsOpenCreateEnvironmentModal,
    handleInputErros,
    handleInputErrosClean,
    setIsNeedRefresh,
  } = getContext();
  const [isFormValue, setIsFormValue] = useState<Partial<ICreateEnvironment>>();
  const newFormValues: Partial<ICreateEnvironment> = { ...isFormValue };

  // const setFormValue = (prop: Partial<ICreateEnvironment>): void => {
  //   for (const key in prop) {
  //     newFormValues[`${key}`] = prop[key];
  //     if (!prop[key].length) delete newFormValues[`${key}`];
  //   }
  //   setIsFormValue(newFormValues);
  // };

  const handleFieldChange = (e: any) => {
    const field = e.target;
    setErrorMessage({ ...errorMessage, [field.name]: '' });
    setHasError({ ...hasError, [field.name]: false });
    setFormData({ ...formData, [field.name]: field.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#form');
    if (checkFields()) return;
    setIsLoading(true);

    await createEnvironment({
      // image,
      name: formData.name,
      capacity: formData.capacity,
      description: formData.description,
    })
      .then(() => {
        handleCloser();
        setIsNeedRefresh(true);
        ToastMessage({ message: 'Ambiente criado', type: Case.SUCCESS });
      })
      .catch(() => {
        ToastMessage({ message: 'Preencha todos os campos', type: Case.ERROR });
      });
    form?.reset();
    cleanData();
  };

  const checkFields = (): boolean => {
    let hasTempError = false;
    const tempMessage = {};
    const tempError = {};
    const errors = {
      name: !formData.name ? 'Campo obrigatório' : null,
      capacity: !formData.capacity ? 'Campo obrigatório' : null,
      description: !formData.description ? 'Campo obrigatório' : null,
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

  useEffect(() => {}, [isResult, isLoading, isFormValue]);

  const cleanData = () => {
    setIsFormValue(undefined);
    setPreviewImage(undefined);
    setIsLoading(false);
  };

  const handleCloser = () => {
    setIsOpenCreateEnvironmentModal(false);
    cleanData();
  };

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsFormValue({ image: file });

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
                            handleFieldChange;
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
                  maxLength={150}
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
