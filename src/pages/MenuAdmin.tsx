import { Users, ListPlus, WarningCircle, List } from 'phosphor-react';
import { Lead } from '../components/Lead';
import { useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { getCountEnvironments, getCountReservationsByStatus, getCountUsers } from '../services/api';
import { ReservationStatus } from '../interfaces';
import { ChartDoughnut } from '../components/ChartDoughnut';
import { ChartBar } from '../components/ChartBar';
import '../styles/menu-admin.scss';

const cardItems = [
  {
    title: 'Usuários cadastrados',
    icon: <Users size={40} alt="Ícone usuários cadastrados" />,
  },
  {
    title: 'Ambientes cadastrados',
    icon: <ListPlus size={40} alt="Ícone ambientes cadastrados" />,
  },
  {
    title: 'Reservas cadastradas',
    icon: <List size={40} alt="Ícone reservas cadastradas" />,
  },
  {
    title: 'Reservas pendentes',
    icon: <WarningCircle size={40} alt="Ícone reservas pendentes" />,
  },
];

export function MenuAdmin() {
  const { isMyselfData, getUserData } = getContext();
  const [isDashboardData, setIsDashboardData] = useState<number[]>([0, 0, 0, 0]);
  const getDashboardData = async (): Promise<void> => {
    const userQty = +(await getCountUsers().then((res) => res.data)) || 0;
    const environmentQty = +(await getCountEnvironments().then((res) => res.data)) || 0;
    const envReservationsQty = +(await getCountReservationsByStatus().then((res) => res.data)) || 0;
    const envReservationsPendingQty =
      +(await getCountReservationsByStatus(ReservationStatus.PENDING).then((res) => res.data)) || 0;
    setIsDashboardData([userQty, environmentQty, envReservationsQty, envReservationsPendingQty]);
  };

  useEffect(() => {
    getUserData();
    getDashboardData();
  }, []);

  return (
    <>
      <div className="page-menu-admin">
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
          <div className="content-main-second">
            <ChartDoughnut usersQty={isDashboardData[0]} environmentsQty={isDashboardData[1]} />
            <ChartBar />
          </div>
        </div>
      </div>
    </>
  );
}
