import { Users, ListPlus, Question } from 'phosphor-react';
import { Lead } from '../components/Lead';
import { Sidebar } from '../components/Sidebar';
import '../styles/menuadmin.scss';

const cardItems = [
  {
    title: 'Pessoas cadastradas',
    total: 68,
    icon: <Users size={40} />,
  },
  {
    title: 'Ambientes cadastrados',
    total: 23,
    icon: <ListPlus size={40} />,
  },
  {
    title: 'Solicitações',
    total: 37,
    icon: <Question size={40} />,
  },
];

export function MenuAdmin() {
  return (
    <div className="page">
      <div className="container">
        <Sidebar />
        <div className="content">
          <div className="content-welcome">
            <h1>
              Seja bem-vindo(a),
              <br />
              <b>UserName</b>
            </h1>
          </div>
          <div className="content-main">
            <h2>Overview</h2>
            <div className="content-lead">
              {cardItems.map((cardItem) => (
                <div className="card" key={cardItem.title}>
                  <div className="card-icon">{cardItem.icon}</div>
                  <Lead title={cardItem.title} total={cardItem.total} />
                </div>
              ))}
            </div>
          </div>
          <div className="content-main">
            <h2>Overview</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
