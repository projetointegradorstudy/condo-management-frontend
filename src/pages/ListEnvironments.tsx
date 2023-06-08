import { useContext, useEffect, useState } from 'react';
import { DeleteUserModal } from '../components/DeleteUserModal';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import { IEnvironment } from '../interfaces';
import { GlobalContext } from '../contexts/GlobalContext';
import { EnvironmentTable } from '../components/EnvironmentTable';
import { getEnvironments } from '../services/api';
import { EditEnvironmentModal } from '../components/EditEnvironmentModal';
import '../styles/list-environments.scss';

export function ListEnvironments() {
  const [environments, setEnvironments] = useState<IEnvironment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GlobalContext);

  if (!context) return null;

  const { isOpenEditModal, setOpenEditModal, isOpenDeleteModal, setOpenDeletModal } = context;

  useEffect(() => {
    if (isLoading)
      (async () => {
        await getEnvironments()
          .then((res) => {
            setIsLoading(false);
            setEnvironments(res.data);
          })
          .catch(() => {});
      })();
  }, [isLoading]);

  return (
    <div className="page-list-environments">
      <div className="container-list-environments">
        <Sidebar />
        <NavbarMobile />

        <div className="content-list-environments">
          <h1>Lista de ambientes</h1>

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
      <DeleteUserModal
        isOpenDeleteModal={isOpenDeleteModal}
        setOpenDeleteModal={() => setOpenDeletModal(!isOpenDeleteModal)}
      />
      <EditEnvironmentModal
        isOpenEditEnvironmentModal={isOpenEditModal}
        setOpenEditEnvironmentModal={() => setOpenEditModal(!isOpenEditModal)}
      />
    </div>
  );
}
