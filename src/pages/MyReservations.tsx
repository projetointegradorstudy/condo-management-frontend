import { MyReservationTable } from '../components/MyReservationTable';
import { IReservations } from '../interfaces';
import { useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { getEnvReservationsByUser } from '../services/api';
import { ToastNotifications } from '../components/ToastNotifications';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import '../styles/list-my-reservations.scss';

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
          <div className="content-my-requests">
            <h1>Minhas reservas</h1>

            <div className="container">
              <div
                className={myReservations?.length > 0 ? 'content-my-requests-list' : 'content-my-requests-list-reset'}
              >
                <div className="content-list-scroll">
                  {myReservations?.length && !isLoading ? (
                    <MyReservationTable data={myReservations} />
                  ) : !myReservations?.length && isLoading ? (
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
    </>
  );
}
