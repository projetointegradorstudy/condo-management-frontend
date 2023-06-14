import { X, Image } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import { getContext } from '../utils/context-import';
import { IEditEnvironmentModal } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import '../styles/edit-environment-modal.scss';

export function EditEnvironmentModal({ name, description, status, image, capacity }: IEditEnvironmentModal) {
  const { isOpenEditModal, setIsOpenEditModal } = getContext();
  if (isOpenEditModal) {
    return (
      <div className="modal-edit-background-environment">
        <div className="modal-edit-environment">
          <div className="modal-button-close-environment">
            <button className="modal-button-default-environment" onClick={() => setIsOpenEditModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-edit-environment-content">
            <form>
              <div className="modal-content-upload-environment">
                <p>Imagem</p>
                <div className="modal-image-upload-environment">
                  <img src={image ? image : imageDefault} />
                  <div className="modal-button-upload-environment">
                    <Image />
                    <Label title="Choose a file" htmlFor="image" isUploadFile />
                    <Input title="Choose a file" type="file" name="image" id="image" accept=".png, .jpg" hidden />
                  </div>
                </div>
              </div>
              <Label title="Nome" htmlFor="nome" />
              <Input name="nome" id="nome" type="text" placeholder={name} />

              <Label title="Capacidade" htmlFor="capacity" />
              <Input name="capacity" id="capacity" type="text" placeholder={capacity} />

              <Label title="Descrição" htmlFor="description" />
              <textarea name="description" id="description" placeholder={description}></textarea>

              <div className="modal-form-button-environment">
                <Button title="Cancelar" onClick={() => setIsOpenEditModal(false)} isCancel />
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
