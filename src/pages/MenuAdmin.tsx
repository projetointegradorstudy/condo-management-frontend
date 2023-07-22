import { Users, ListPlus, WarningCircle, List } from 'phosphor-react';
import { Lead } from '../components/Lead';
import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { Footer } from '../components/Footer';
import { useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import {
  getCountEnvironments,
  getCountReservations,
  getCountReservationsPending,
  getCountUsers,
} from '../services/api';
import '../styles/menu-admin.scss';
import { ReservationStatus } from '../interfaces';

const cardItems = [
  {
    title: 'Usuários cadastrados',
    icon: <Users size={40} />,
  },
  {
    title: 'Ambientes cadastrados',
    icon: <ListPlus size={40} />,
  },
  {
    title: 'Reservas cadastradas',
    icon: <List size={40} />,
  },
  {
    title: 'Reservas pendentes',
    icon: <WarningCircle size={40} />,
  },
];

export function MenuAdmin() {
  const { isMyselfData, getUserData } = getContext();
  const [isDashboardData, setIsDashboardData] = useState<number[] | null>(null);
  const getDashboardData = async (): Promise<void> => {
    const userQty = +(await getCountUsers().then((res) => res.data)) || 0;
    const environmentQty = +(await getCountEnvironments().then((res) => res.data)) || 0;
    const envReservationsQty = +(await getCountReservations().then((res) => res.data)) || 0;
    const envReservationsPendingQty =
      +(await getCountReservationsPending(ReservationStatus.PENDING).then((res) => res.data)) || 0;
    setIsDashboardData([userQty, environmentQty, envReservationsQty, envReservationsPendingQty]);
  };

  useEffect(() => {
    getUserData();
    getDashboardData();
  }, []);

  return (
    <>
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
              <h2>Visão geral</h2>
              <div className="content-lead">
                {cardItems.map((cardItem, index) => (
                  <div className="card" key={cardItem.title}>
                    <div className="card-icon">{cardItem.icon}</div>
                    <Lead title={cardItem.title} total={(isDashboardData && isDashboardData[index]) || 0} />
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
      <Footer isFull />
    </>
  );
}
