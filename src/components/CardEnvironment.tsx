import { Users } from 'phosphor-react';
import { Button } from './Button';
import '../styles/card-environment.scss';
import { IDataElementProps } from '../interfaces';

export function CardEnvironment({ data }: IDataElementProps) {
  return (
    <div className="card-environment">
      <div className="card-content">
        <div className="card-image">
          <img src={data.image} alt="" />
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
            <Button title="Mais detalhes" />
          </div>
        </div>
      </div>
    </div>
  );
}
