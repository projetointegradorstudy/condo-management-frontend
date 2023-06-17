import { Users, ListPlus, Question } from 'phosphor-react';
import { Lead } from '../components/Lead';
import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { Footer } from '../components/Footer';
import '../styles/menu-admin.scss';
import { useEffect } from 'react';
import { getContext } from '../utils/context-import';

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
  const { isMyselfData, isNeedRefresh, getUserData } = getContext();

  useEffect(() => {
    getUserData();
  }, [isNeedRefresh]);

  return (
    <div className="page-menu-admin">
      <div className="container-menu-admin">
        <Sidebar />
        <NavbarMobile />
        <div className="content-menu-admin">
          <div className="content-welcome">
            <h1>
              Seja bem-vindo(a),
              <br />
              <b>{isMyselfData?.name || isMyselfData?.email}</b>
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
      <Footer isFull />
    </div>
  );
}
