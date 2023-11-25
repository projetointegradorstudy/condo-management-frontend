import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import { IEnvironment } from '../interfaces';
import { EnvironmentTable } from '../components/EnvironmentTable';
import { getEnvironments } from '../services/api';
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
          <div className="content-list-environments">
            <h1>Lista de ambientes</h1>

            <div className="content-list-button">
              <Button title="Adicionar" onClick={() => setIsOpenCreateEnvironmentModal(true)} />
            </div>

            <div className="container">
              <div className={environments?.length > 0 ? 'content-list' : 'content-list-reset'}>
                <div className="content-list-scroll">
                  {environments?.length && !isLoading ? (
                    <EnvironmentTable data={environments} />
                  ) : !environments?.length && isLoading ? (
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
