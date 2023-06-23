import { Footer } from '../components/Footer';
import { MyRequestTable } from '../components/MyRequestTable';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { IRequests } from '../interfaces';
import { useEffect, useState } from 'react';
import { getContext } from '../utils/context-import';
import { getEnvRequestsbyUser } from '../services/api';
import '../styles/list-my-requests.scss';

export function MyRequests() {
  const [myRequests, setMyRequests] = useState<IRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isNeedRefresh, setIsNeedRefresh } = getContext();

  useEffect(() => {
    if (isLoading || isNeedRefresh)
      (async () => {
        await getEnvRequestsbyUser()
          .then((res) => {
            console.log(res.data);
            setIsLoading(false);
            setMyRequests(res.data);
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
            <h1>Minhas solicitações</h1>

            <div className="content-my-requests-list">
              <MyRequestTable data={myRequests} />
            </div>
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
