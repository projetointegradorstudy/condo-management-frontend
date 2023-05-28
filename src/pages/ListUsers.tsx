import { useEffect, useState } from 'react';
import { PencilSimpleLine, Trash } from 'phosphor-react';
import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { EditUserModal } from '../components/EditUserModal';
import { DeleteUserModal } from '../components/DeleteUserModal';
import '../styles/list-users.scss';
import { getUsers } from '../services/api';
import { IUser } from '../interfaces';
import { Spinner } from '../components/Spinner';
import { WarningFeedback } from '../components/WarningFeedback';
import avatarDefault from '../assets/avatar-default.png';

export function ListUsers() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeletModal] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        <div className={`content-list-users ${openEditModal || openDeleteModal ? 'mgReset' : 'mgDefault'}`}>
          <h1>Lista de usuários</h1>

          <div className="content-list">
            {users?.length > 0 && !isLoading ? (
              <table>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>Privilégio</th>
                    <th>Registrado</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>
                            <img src={user?.avatar ? user.avatar : avatarDefault} alt="avatar" />
                          </td>
                          <td>
                            <h4>{user.name}</h4>
                          </td>
                          <td>
                            <p>{user.username}</p>
                          </td>
                          <td>
                            <p>{user.role}</p>
                          </td>
                          <td>
                            <p>{user.registered_at}</p>
                          </td>
                          <td>
                            <div className="content-buttons">
                              <button onClick={() => setOpenEditModal(true)}>
                                <PencilSimpleLine />
                              </button>
                              <button onClick={() => setOpenDeletModal(true)}>
                                <Trash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : users?.length === 0 && isLoading ? (
              <Spinner />
            ) : (
              <WarningFeedback />
            )}
          </div>
          <DeleteUserModal
            isOpenDeleteModal={openDeleteModal}
            setOpenDeleteModal={() => setOpenDeletModal(!openDeleteModal)}
          />
          <EditUserModal isOpenEditModal={openEditModal} setOpenEditModal={() => setOpenEditModal(!openEditModal)} />
        </div>
      </div>
    </div>
  );
}
