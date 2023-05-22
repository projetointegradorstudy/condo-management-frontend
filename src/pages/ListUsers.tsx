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
    <div className="page">
      <div className="container">
        <Sidebar />
        <NavibarMobile />

        <div className="content">
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
                        <button onClick={() => setOpenModal(true)}>
                          <PencilSimpleLine />
                        </button>
                        <button>
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <EditUserModal isOpen={openModal} />
        </div>
      </div>
    </div>
  );
}
