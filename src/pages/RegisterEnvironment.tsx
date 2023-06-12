import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { Label } from '../components/Label';
import { Footer } from '../components/Footer';
import '../styles/register-environment.scss';

export function RegisterEnvironment() {
  return (
    <div className="page-register-environment">
      <div className="container-register-environment">
        <Sidebar />
        <NavbarMobile />
        <div className="content-register-environment">
          <h1>Cadastro de ambientes</h1>

          <div className="content-form-environment">
            <form>
              <div className="content-upload-environment">
                <p>Imagem</p>
                <div className="image-upload-environment">
                  <div className="button-upload-environment">
                    <Label title="Choose file" htmlFor="avatar" isUploadFile />
                    <Input title="Choose file" type="file" name="avatar" id="avatar" accept=".png, .jpg" hidden />
                  </div>
                </div>
              </div>
              <Label title="Nome" htmlFor="nome" />
              <Input name="nome" id="nome" type="text" placeholder="" />

              <Label title="Capacidade" htmlFor="capacity" />
              <Input name="capacity" id="capacity" type="text" placeholder="" />

              <Label title="Descrição" htmlFor="description" />
              <textarea name="description" id="description"></textarea>

              <div className="form-button-environment">
                <Button title="Cadastrar" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer isFull />
    </div>
  );
}
