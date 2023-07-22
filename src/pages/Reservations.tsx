import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavbarMobile } from '../components/NavbarMobile';
import { ReservationTable } from '../components/ReservationTable';
import { Sidebar } from '../components/Sidebar';
import { IReservations } from '../interfaces';
import { getContext } from '../utils/context-import';
import { getEnvironmentReservations } from '../services/api';
import { ToastNotifications } from '../components/ToastNotifications';
import '../styles/list-reservations.scss';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';

export function Reservations() {
  const [reservation, setReservations] = useState<IReservations[]>([]);
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
                  {reservation?.length && !isLoading ? (
                    <ReservationTable data={reservation} />
                  ) : !reservation?.length && isLoading ? (
                    <Spinner />
                  ) : (
                    <WarningFeedback title="Não há registros." />
                  )}
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
