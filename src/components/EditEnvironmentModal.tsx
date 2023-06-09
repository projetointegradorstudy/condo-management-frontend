import { X } from 'phosphor-react';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';
import '../styles/edit-environment-modal.scss';
import { getContext } from '../utils/context-import';

export function EditEnvironmentModal() {
  const { isOpenEditModal, setIsOpenEditModal } = getContext();
  if (isOpenEditModal) {
    return (
      <div className="modal-edit-background-environment">
        <div className="modal-content-environment">
          <div className="modal-button-close-environment">
            <button className="modal-button-default-environment" onClick={() => setIsOpenEditModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-content-form-environment">
            <form>
              <div className="modal-content-upload-environment">
                <p>Imagem</p>
                <div className="modal-image-upload-environment">
                  <div className="modal-button-upload-environment">
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
