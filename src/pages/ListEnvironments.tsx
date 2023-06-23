import { useEffect, useState } from 'react';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import { IEnvironment } from '../interfaces';
import { EnvironmentTable } from '../components/EnvironmentTable';
import { getEnvironments } from '../services/api';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { getContext } from '../utils/context-import';
import { ToastNotifications } from '../components/ToastNotifications';
import '../styles/list-environments.scss';

export function ListEnvironments() {
  const [environments, setEnvironments] = useState<IEnvironment[]>([]);
  const { setIsOpenCreateEnvironmentModal, isNeedRefresh, setIsNeedRefresh } = getContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading || isNeedRefresh)
      (async () => {
        await getEnvironments()
          .then((res) => {
            setIsLoading(false);
            setEnvironments(res.data);
          })
          .catch(() => {});
      })();
    setIsNeedRefresh(false);
  }, [isLoading, isNeedRefresh]);

  return (
    <>
      <div className="page-list-environments">
        <div className="container-list-environments">
          <Sidebar />
          <NavbarMobile />

          <div className="content-list-environments">
            <h1>Lista de ambientes</h1>

            <div className="content-list-button">
              <Button title="Adicionar" onClick={() => setIsOpenCreateEnvironmentModal(true)} />
            </div>

            <div className="content-list">
              {environments?.length > 0 && !isLoading ? (
                <EnvironmentTable data={environments} />
              ) : environments?.length === 0 && isLoading ? (
                <Spinner />
              ) : (
                <WarningFeedback title="Não há registros." />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastNotifications />
      <Footer isFull />
    </>
  );
}
