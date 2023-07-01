import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavbarMobile } from '../components/NavbarMobile';
import { RequestTable } from '../components/RequestTable';
import { Sidebar } from '../components/Sidebar';
import { IRequests } from '../interfaces';
import { getContext } from '../utils/context-import';
import { getEnvironmentRequests } from '../services/api';
import '../styles/list-requests.scss';

export function Requests() {
  const [requests, setRequests] = useState<IRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isNeedRefresh, setIsNeedRefresh } = getContext();

  useEffect(() => {
    if (isLoading || isNeedRefresh)
      (async () => {
        await getEnvironmentRequests()
          .then((res) => {
            setIsLoading(false);
            setRequests(res.data);
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

            <div className="content-requests-list">
              <RequestTable data={requests} />
            </div>
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
