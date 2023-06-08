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
import { UserTable } from '../components/UserTable';
import { Button } from '../components/Button';
import { CreateUserModal } from '../components/CreateUserModal';

export function ListUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GlobalContext);

  if (!context) return null;

  const {
    isOpenEditModal,
    setOpenEditModal,
    isOpenDeleteModal,
    setOpenDeletModal,
    isOpenCreateUserModal,
    setOpenCreateUserModal,
  } = context;

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

          <div className="content-list-button">
            <Button title="Adicionar" onClick={setOpenCreateUserModal} />
          </div>

          <div className="content-list">
            {users?.length > 0 && !isLoading ? (
              <UserTable data={users} />
            ) : users?.length === 0 && isLoading ? (
              <Spinner />
            ) : (
              <WarningFeedback />
            )}
          </div>
        </div>
      </div>
      <DeleteUserModal
        isOpenDeleteModal={isOpenDeleteModal}
        setOpenDeleteModal={() => setOpenDeletModal(!isOpenDeleteModal)}
      />
      <EditUserModal isOpenEditModal={isOpenEditModal} setOpenEditModal={() => setOpenEditModal(!isOpenEditModal)} />
      <CreateUserModal />
    </div>
  );
}
