import { Users } from 'phosphor-react';
import { Button } from './Button';
import piscinaImg from '../assets/piscina.png';

import '../styles/card-environment.scss';

export function CardEnvironment() {
  return (
    <div className="card-environment">
      <div className="card-content">
        <div className="card-image">
          <img src={piscinaImg} alt="" />
        </div>
        <div className="card-title">
          <h3>Piscina</h3>
        </div>
        <div className="card-description">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id sem in sem fringilla volutpat ac et
            massa.Integer efficitur cursus ajsiosdjiosdj jsdi ojsdi jsidj isdjios jisdo jsijdijdisss s idjisdjdsioj isj
            isj oisjsdsdsdjsdoisdjsiodjdiojsdsjisdojsio jds sdjiosdjiojsdio joisjd ojdi sjsido jdo
          </span>
        </div>

        <div className="card-footer">
          <div className="card-info" title="Quantidade de pessoas">
            <Users size={20} />
            <strong>90</strong>
          </div>

          <div className="card-button">
            <Button title="Mais detalhes" />
          </div>
        </div>
      </div>
    </div>
  );
}
