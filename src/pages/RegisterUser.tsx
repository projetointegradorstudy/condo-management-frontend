import { useState } from 'react';
import { Camera } from 'phosphor-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { NavibarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { Label } from '../components/Label';
import '../styles/registeruser.scss';

export function RegisterUser() {
  const [image, setImage] = useState(null);

  return (
    <div className="page-register-user">
      <div className="container-register-user">
        <Sidebar />
        <NavibarMobile />
        <div className="content-register-user">
          <h1>Cadastro de pessoas</h1>

          <div className="content-form">
            <form>
              <div className="content-upload">
                <div className="image-upload">
                  {image ? <img src={image} alt="avatar" /> : <Camera size={24} weight="fill" />}
                </div>
                <div className="button-upload">
                  <p>Imagem</p>
                  <Label title="Choose file" htmlFor="avatar" isUploadFile />
                  <Input title="Choose file" type="file" name="avatar" id="avatar" accept=".png, .jpg" hidden />
                </div>
              </div>
              <Label title="Nome" htmlFor="nome" />
              <Input name="nome" id="nome" type="text" placeholder="Nome do usuário" />
              <Label title="Username" htmlFor="username" />
              <Input name="username" id="username" type="text" placeholder="Username do usuário" />
              <Label title="Password" htmlFor="password" />
              <Input name="password" id="password" type="password" placeholder="Senha do usuário" />

              <div className="form-button">
                <Button title="Cadastrar" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
