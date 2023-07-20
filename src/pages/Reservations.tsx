import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavbarMobile } from '../components/NavbarMobile';
import { ReservationTable } from '../components/ReservationTable';
import { Sidebar } from '../components/Sidebar';
import { IReservations } from '../interfaces';
import { getContext } from '../utils/context-import';
import { getEnvironmentReservations } from '../services/api';
import '../styles/list-reservations.scss';

export function Reservations() {
  const [requests, setReservations] = useState<IReservations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isNeedRefresh, setIsNeedRefresh } = getContext();

  useEffect(() => {
    if (isLoading || isNeedRefresh)
      (async () => {
        await getEnvironmentReservations()
          .then((res) => {
            setIsLoading(false);
            setReservations(res.data);
          })
          .catch(() => {});
      })();
    setIsNeedRefresh(false);
  }, [isLoading, isNeedRefresh]);

  return (
    <>
      <div className="page-requests">
        <div className="container-requests">
          <Sidebar />
          <NavbarMobile />

          <div className="content-requests">
            <h1>Reservas</h1>

            <div className="container">
              <div className="content-requests-list">
                <div className="content-list-scroll">
                  <ReservationTable data={requests} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
