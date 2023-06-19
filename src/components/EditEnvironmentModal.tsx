import { X, Image, CheckCircle, Trash } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { IEditEnvironment, IResultRequest, editEnvironmentMessages } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { updateEnvironment } from '../services/api';
import { Spinner } from './Spinner';
import '../styles/edit-environment-modal.scss';

export function EditEnvironmentModal({ id, name, description, status, image, capacity }: IEditEnvironment) {
  const [previewImage, setPreviewImage] = useState<string>();
  const { isOpenEditModal, setIsOpenEditModal, setIsNeedRefresh } = getContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const [isFormValue, setIsFormValue] = useState<Partial<IEditEnvironment>>();
  const newFormValues: Partial<IEditEnvironment> = { ...isFormValue };

  const setFormValue = (prop: Partial<IEditEnvironment>): void => {
    for (const key in prop) {
      newFormValues[`${key}`] = prop[key];
      if (!prop[key].length) delete newFormValues[`${key}`];
    }
    setIsFormValue(newFormValues);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await updateEnvironment(id, newFormValues)
      .then((res) => {
        if (res.status === 200) {
          setIsResult({
            message: editEnvironmentMessages[res.statusText],
            icon: <CheckCircle color="#38ba7c" />,
          });
          setIsNeedRefresh(true);
          return;
        }
      })
      .catch(() => {});
    setIsLoading(false);
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

  // const handleRefresh = () => {
  //   setIsOpenEditModal(true);
  //   cleanData();
  // };

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
          {!isResult && (
            <div className="modal-edit-environment-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-content-upload-environment">
                  <p>Imagem</p>
                  {!previewImage ? (
                    <div className="modal-image-upload-environment">
                      <img src={image && imageDefault} />
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
                            handleImagePreview(e);
                            setFormValue({ image: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="image-upload-edit-environment-preview">
                      <img className="preview" src={previewImage} alt="Preview" />
                      <div className="button-upload-edit-environment-preview">
                        <Trash />
                        <button className="trash" onClick={() => setPreviewImage(undefined)}>
                          Excluir foto
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <Label title="Nome" htmlFor="nome" />
                <Input
                  name="nome"
                  id="nome"
                  type="text"
                  placeholder={name}
                  onChange={(e) => setFormValue({ name: e.target.value })}
                />

                <Label title="Capacidade" htmlFor="capacity" />
                <Input
                  name="capacity"
                  id="capacity"
                  type="text"
                  placeholder={capacity}
                  onChange={(e) => setFormValue({ capacity: e.target.value })}
                />

                <Label title="Descrição" htmlFor="description" />
                <textarea
                  name="description"
                  id="description"
                  placeholder={description}
                  onChange={(e) => setFormValue({ description: e.target.value })}
                ></textarea>

                <div className="modal-form-button-environment">
                  <Button title="Cancelar" onClick={handleCloser} isCancel />
                  <Button title="Confirmar" type="submit" isConfirm />
                </div>
              </form>
            </div>
          )}
          {isResult && (
            <div className="modal-edit-environment-content-feedback">
              {isResult.icon}

              <span>{isResult.message}</span>

              <div className="modal-edit-environment-form-button">
                <Button title="Fechar" onClick={handleCloser} isCancel />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
