import { useState } from 'react';
import { Camera } from 'phosphor-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { Label } from '../components/Label';
import '../styles/register-user.scss';
import { createUser } from '../services/api';
import { CreateUserType } from '../interfaces';

export function RegisterUser() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState<CreateUserType>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData) {
      console.log('TRUE', formData);
    } else {
      console.log('FALSE', formData);
    }

    // const res = await createUser();

    // if (res.success && res.data?.access_token) {
    //   setToken(res.data?.access_token);
    //   setIsAuthenticated(true);
    //   navigate('/dashboard-admin');
    // }
  };

  const handleInvalid = (event: any) => {
    const element = event.currentTarget;
    console.log(element.validity);

    if (element.validity.valueMissing) {
      element.setCustomValidity('Please fill in the field.');
      element.classList.add('error-notice');
    }
  };

  return (
    <div className="page-register-user">
      <div className="container-register-user">
        <Sidebar />
        <NavbarMobile />
        <div className="content-register-user">
          <h1>Cadastro de pessoas</h1>

          <div className="content-form">
            <form onSubmit={handleSubmit}>
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
              <Input
                name="nome"
                id="nome"
                type="text"
                placeholder="Nome do usuário"
                onBlur={(e) => {
                  e.target.classList.remove('error-notice');
                  e.target.setCustomValidity('');
                }}
                onChange={(e) => setFormData({ name: e.target.value.toLowerCase() })}
                required
                onInvalid={handleInvalid}
              />
              <Label title="Username" htmlFor="username" />
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="Username do usuário"
                onBlur={(e) => {
                  e.target.classList.remove('error-notice');
                  e.target.setCustomValidity('');
                }}
                onChange={(e) => setFormData({ username: e.target.value.toLowerCase() })}
                required
                onInvalid={handleInvalid}
              />
              <Label title="Password" htmlFor="password" />
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Senha do usuário"
                autoComplete="on"
                onBlur={(e) => {
                  e.target.classList.remove('error-notice');
                  e.target.setCustomValidity('');
                }}
                onChange={(e) => setFormData({ password: e.target.value.toLowerCase() })}
                required
                onInvalid={handleInvalid}
              />

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
