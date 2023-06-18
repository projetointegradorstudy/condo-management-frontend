import { useEffect, useState } from 'react';
import { X, CheckCircle, WarningCircle, XCircle, Image } from 'phosphor-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { createEnvironment } from '../services/api';
import { getContext } from '../utils/context-import';
import { Spinner } from './Spinner';
import { IEnvironment, IResultRequest, createUserMessages } from '../interfaces';
import '../styles/create-environment-modal.scss';

export function CreateEnvironmentModal() {
  const [isEmail, setIsEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState<IResultRequest | null>(null);
  const {
    isOpenCreateEnvironmentModal,
    setIsOpenCreateEnvironmentModal,
    handleInputErros,
    handleInputErrosClean,
    setIsNeedRefresh,
  } = getContext();

  const handleSubmit = async (e: any) => {
    //   e.preventDefault();
    //   setIsLoading(true);
    //   await createEnvironment()
    //     .then((res) => {
    //       if (res.status === 201) {
    //         setIsResult({ message: createUserMessages[res.data.message], icon: <CheckCircle color="#38ba7c" /> });
    //         setIsNeedRefresh(true);
    //         return;
    //       }
    //       setIsResult({ message: createUserMessages[res.data.message], icon: <WarningCircle color="#ffc107" /> });
    //     })
    //     .catch((e) => {
    //       setIsResult({ message: createUserMessages[e.response.data.message], icon: <XCircle color="#f34542" /> });
    //     });
    //   setIsLoading(false);
  };

  useEffect(() => {}, [isResult, isLoading]);

  const handleCloser = () => {
    setIsOpenCreateEnvironmentModal(false);
    setIsResult(null);
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setIsOpenCreateEnvironmentModal(true);
    setIsResult(null);
    setIsLoading(false);
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
          {!isResult?.message && (
            <div className="modal-create-environment-content">
              <div className="modal-create-environment-title">
                <h4>Adicionar ambiente</h4>
              </div>

              <div className="modal-create-environment-content-form">
                <form onSubmit={handleSubmit}>
                  <div className="content-upload-register-environment">
                    <p>Imagem</p>
                    <div className="image-upload-register-environment">
                      <div className="button-upload-register-environment">
                        <Image />
                        <Label title="Choose file" htmlFor="avatar" isUploadFile />
                        <Input
                          title="Choose file"
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept=".png, .jpg, .jpeg"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <Label title="Nome" htmlFor="nome" />
                  <Input
                    name="nome"
                    id="nome"
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                      handleInputErrosClean(e);
                    }}
                    required
                    onInvalid={handleInputErros}
                  />

                  <Label title="Capacidade" htmlFor="capacity" />
                  <Input
                    name="capacity"
                    id="capacity"
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                      handleInputErrosClean(e);
                    }}
                    required
                    onInvalid={handleInputErros}
                  />

                  <Label title="Descrição" htmlFor="description" />
                  <textarea
                    name="description"
                    id="description"
                    onChange={(e) => {
                      handleInputErrosClean(e);
                    }}
                    required
                    onInvalid={handleInputErros}
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
