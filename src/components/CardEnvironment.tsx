import { Users } from 'phosphor-react';
import { Button } from './Button';
import { IDataElementProps, IEnvironment } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import { getContext } from '../utils/context-import';
import '../styles/card-environment.scss';

export function CardEnvironment({ data }: IDataElementProps<IEnvironment>) {
  const { setIsReservationModal } = getContext();

  return (
    <div className="card-environment">
      <div className="card-content">
        <div className="card-image">
          <img src={data?.image ? data.image : imageDefault} alt="No image" />
        </div>
        <div className="card-title">
          <h3>{data.name}</h3>
        </div>
        <div className="card-description">
          <span>{data.description}</span>
        </div>

        <div className="card-footer">
          <div className="card-info" title="Quantidade de pessoas">
            <Users size={20} />
            <strong>{data.capacity}</strong>
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
