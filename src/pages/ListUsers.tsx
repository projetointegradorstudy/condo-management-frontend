import { useState } from 'react';
import { NavibarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import { EditUserModal } from '../components/EditUserModal';
import { PencilSimpleLine, Trash } from 'phosphor-react';
import { USERS } from '../utils/users';
import '../styles/listusers.scss';

export function ListUsers() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="page-list-users">
      <div className="container-list-users">
        <Sidebar />
        <NavibarMobile />

        <div className="content-list-users" style={{ margin: openModal ? '0' : '100px 76px 30px' }}>
          <h1>Lista de usuários</h1>

          <div className="content-list">
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
                {USERS.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <img src={user.avatar} alt="avatar" />
                      </td>
                      <td>
                        <h4>{user.name}</h4>
                      </td>
                      <td>
                        <p>{user.user_name}</p>
                      </td>
                      <td>
                        <p>{user.role}</p>
                      </td>
                      <td>
                        <p>{user.registered_at}</p>
                      </td>
                      <td>
                        <div className="content-buttons">
                          <button onClick={() => setOpenModal(true)}>
                            <PencilSimpleLine />
                          </button>
                          <button>
                            <Trash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <EditUserModal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)} />
        </div>
      </div>
    </div>
  );
}
