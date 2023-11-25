import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { IUser } from '../interfaces';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import { UserTable } from '../components/UserTable';
import { Button } from '../components/Button';
import { getContext } from '../utils/context-import';
import { ToastNotifications } from '../components/ToastNotifications';
import '../styles/list-users.scss';

export function ListUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsOpenCreateUserModal, isNeedRefresh, setIsNeedRefresh } = getContext();

  useEffect(() => {
    if (isLoading || isNeedRefresh)
      (async () => {
        await getUsers()
          .then((res) => {
            setIsLoading(false);
            setUsers(res.data);
          })
          .catch(() => {});
      })();
    setIsNeedRefresh(false);
  }, [isLoading, isNeedRefresh]);

  return (
    <>
      <div className="page-list-users">
        <div className="container-list-users">
          <div className="content-list-users">
            <h1>Lista de usuários</h1>

            <div className="content-list-button">
              <Button title="Adicionar" onClick={() => setIsOpenCreateUserModal(true)} />
            </div>

            <div className="container">
              <div className={users?.length > 0 ? 'content-list' : 'content-list-reset'}>
                <div className="content-list-scroll">
                  {users?.length > 0 && !isLoading ? (
                    <UserTable data={users} />
                  ) : users?.length === 0 && isLoading ? (
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
