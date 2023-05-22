import { X } from 'phosphor-react';
import '../styles/editusermodal.scss';

interface modalProps {
  isOpen: boolean;
}

export function EditUserModal({ isOpen }: modalProps) {
  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal-content">
          <button onClick={() => !isOpen}>
            <X size={18} />
          </button>

          <h4>Editar</h4>
        </div>
      </div>
    );
  }
  return null;
}
