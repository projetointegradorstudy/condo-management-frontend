import { Gear, Users } from 'phosphor-react';
import { Button } from './Button';
import { IDataElementProps, IEnvironment } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import { getContext } from '../utils/context-import';
import '../styles/card-environment.scss';

export function CardEnvironment({ data }: IDataElementProps<IEnvironment>) {
  const { setIsReservationModal } = getContext();

  return (
    <div className={`card-environment ${data.status === 'maintenance' ? 'card-environment-maintenance' : ''}`}>
      <div
        style={{ display: data.status === 'maintenance' ? 'flex' : 'none' }}
        className="card-environment-maintenance-message"
      >
        <Gear size={36} weight="fill" className="gear" />

        <span>Em manutenção...</span>
      </div>
      <div className="card-content">
        <div className="card-image">
          <img src={data?.image ? data.image : imageDefault} alt={`Espaço ${data.name}`} />
        </div>
        <div className="card-title">
          <h3>{data.name}</h3>
        </div>
        <div className="card-description">
          <span>{data.description}</span>
        </div>

        <div className="card-footer">
          <div className="card-info" title="Quantidade de pessoas">
            <Users size={20} alt="Ícone de capacidade" />
            <b>{data.capacity}</b>
          </div>

          <div className="card-button">
            <Button
              title="Reservar"
              onClick={() => {
                setIsReservationModal({ isOpen: true, data });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
