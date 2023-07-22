import { Footer } from '../components/Footer';
import { MyReservationTable } from '../components/MyReservationTable';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { IReservations } from '../interfaces';
import { useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { getEnvReservationsByUser } from '../services/api';
import '../styles/list-my-reservations.scss';
import { ToastNotifications } from '../components/ToastNotifications';

export function MyReservations() {
  const [myReservations, setMyReservations] = useState<IReservations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isNeedRefresh, setIsNeedRefresh } = getContext();

  useEffect(() => {
    if (isLoading || isNeedRefresh)
      (async () => {
        await getEnvReservationsByUser()
          .then((res) => {
            setIsLoading(false);
            setMyReservations(res.data);
          })
          .catch(() => {});
      })();
    setIsNeedRefresh(false);
  }, [isLoading, isNeedRefresh]);

  return (
    <>
      <div className="page-my-requests">
        <div className="container-my-requests">
          <Sidebar />
          <NavbarMobile />

          <div className="content-my-requests">
            <h1>Minhas reservas</h1>

            <div className="container">
              <div className="content-my-requests-list">
                <div className="content-list-scroll">
                  <MyReservationTable data={myReservations} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastNotifications />
      <Footer isFull />
    </>
  );
}
