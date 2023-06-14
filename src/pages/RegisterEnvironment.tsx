import { useState } from 'react';
import { getContext } from '../utils/context-import';
import { CheckCircle, Image } from 'phosphor-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { Label } from '../components/Label';
import { Footer } from '../components/Footer';
import { Spinner } from '../components/Spinner';
import '../styles/register-environment.scss';

export function RegisterEnvironment() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const { handleInputErros, handleInputErrosClean } = getContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    //
    setIsLoading(false);
  };

  return (
    <div className="page-register-environment">
      <div className="container-register-environment">
        <Sidebar />
        <NavbarMobile />
        <div className="content-register-environment">
          <h1>Cadastro de ambientes</h1>
          <div className="content-form-register-environment">
            {isLoading && <Spinner />}
            {!isMessage && (
              <form onSubmit={handleSubmit}>
                <div className="content-upload-register-environment">
                  <p>Imagem</p>
                  <div className="image-upload-register-environment">
                    <div className="button-upload-register-environment">
                      <Image />
                      <Label title="Choose file" htmlFor="avatar" isUploadFile />
                      <Input title="Choose file" type="file" name="avatar" id="avatar" accept=".png, .jpg" hidden />
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

                <div className="form-button-register-environment">
                  <Button title="Cadastrar" type="submit" />
                </div>
              </form>
            )}

            {isMessage && (
              <div className="modal-create-content-feedback">
                <CheckCircle />
                <span>{isMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer isFull />
    </div>
  );
}
