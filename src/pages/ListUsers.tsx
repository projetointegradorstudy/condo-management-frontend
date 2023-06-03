import { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { EditUserModal } from '../components/EditUserModal';
import { DeleteUserModal } from '../components/DeleteUserModal';
import '../styles/list-users.scss';
import { getUsers } from '../services/api';
import { IUser } from '../interfaces';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import { GlobalContext } from '../contexts/GlobalContext';
import { Table } from '../components/Table';

export function ListUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GlobalContext);

  if (!context) return null;

  const { openEditModal, setOpenEditModal, openDeleteModal, setOpenDeletModal } = context;

  useEffect(() => {
    if (isLoading)
      (async () => {
        await getUsers()
          .then((res) => {
            setIsLoading(false);
            setUsers(res.data);
          })
          .catch(() => {});
      })();
  }, [isLoading]);

  return (
    <div className="page-list-users">
      <div className="container-list-users">
        <Sidebar />
        <NavbarMobile />

        <div className="content-list-users">
          <h1>Lista de usuários</h1>

          <div className="content-list">
            {users?.length > 0 && !isLoading ? (
              <Table data={users} />
            ) : users?.length === 0 && isLoading ? (
              <Spinner />
            ) : (
              <WarningFeedback />
            )}
          </div>
        </div>
      </div>
      <DeleteUserModal
        isOpenDeleteModal={openDeleteModal}
        setOpenDeleteModal={() => setOpenDeletModal(!openDeleteModal)}
      />
      <EditUserModal isOpenEditModal={openEditModal} setOpenEditModal={() => setOpenEditModal(!openEditModal)} />
    </div>
  );
}
