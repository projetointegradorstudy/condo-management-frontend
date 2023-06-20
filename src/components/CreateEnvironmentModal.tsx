import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { X, CheckCircle, Image, Trash } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { createEnvironment } from '../services/api';
import { getContext } from '../utils/context-import';
import { Spinner } from './Spinner';
import { ICreateEnvironment, IResultRequest, createEnvironmentMessages } from '../interfaces';
import '../styles/create-environment-modal.scss';

export function CreateEnvironmentModal() {
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

  const setFormValue = (prop: Partial<ICreateEnvironment>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      console.log(newFormValues);
      if (!prop[key].length) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createEnvironment(newFormValues)
      .then((res) => {
        if (res.status === 201) {
          setIsResult({ message: createEnvironmentMessages[res.statusText], icon: <CheckCircle color="#38ba7c" /> });
          setIsNeedRefresh(true);
          cleanData();
          return;
        }
      })
      .catch(() => {});
    setIsLoading(false);
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

  const handleRefresh = () => {
    setIsOpenCreateEnvironmentModal(true);
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
        <div className={!isResult ? 'modal-create-environment' : 'modal-create-environment-feedback'}>
          <div className="modal-create-environment-button-close">
            <button className="modal-create-environment-button-default" onClick={handleCloser}>
              <X size={20} />
            </button>
          </div>
          {isLoading && <Spinner />}
          {!isResult?.message && (
            <div className="modal-create-environment-content">
              <div className="modal-create-environment-title">
                <h4>Adicionar ambiente</h4>
              </div>

              <div className="modal-create-environment-content-form">
                <form onSubmit={handleSubmit}>
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
                              handleImagePreview(e);
                            }}
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
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Ex: Piscina"
                    onChange={(e) => {
                      handleInputErrosClean(e);
                      setFormValue({ name: e.target.value });
                    }}
                    required
                    onInvalid={handleInputErros}
                  />

                  <Label title="Capacidade" htmlFor="capacity" />
                  <Input
                    name="capacity"
                    id="capacity"
                    type="number"
                    placeholder="Ex: 18"
                    onChange={(e) => {
                      setFormValue({ capacity: e.target.value });
                    }}
                  />

                  <Label title="Descrição" htmlFor="description" />
                  <textarea
                    name="description"
                    id="description"
                    placeholder="..."
                    onChange={(e) => {
                      setFormValue({ description: e.target.value });
                    }}
                  />
                  <div className="modal-create-environment-form-button">
                    <Button title="Cancelar" onClick={handleCloser} isCancel />
                    <Button title="Confirmar" type="submit" isConfirm />
                  </div>
                </form>
              </div>
            </div>
          )}

          {isResult?.message && (
            <div className="modal-create-environment-content-feedback">
              {isResult.icon}

              <span>{isResult?.message}</span>

              <div className="modal-create-environment-form-button">
                <Button title="Fechar" onClick={handleCloser} isCancel />
                <Button title="Adicionar novo" onClick={handleRefresh} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
