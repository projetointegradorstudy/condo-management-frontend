import { PencilSimpleLine, Trash } from 'phosphor-react';
import avatarDefault from '../assets/avatar-default.png';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IUser } from '../interfaces';

export function UserTable({ data }: IDataElementProps<IUser[]>) {
  const userFields = ['Avatar', 'Nome', 'Username', 'Tipo', 'Data de registro', ''];
  const { setOpenEditModal, setOpenDeletModal, formatDate } = getContext();

  return (
    <>
      <table>
        <thead>
          <tr>
            {userFields.map((field, index) => {
              return <th key={index}>{field} </th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((user: IUser) => {
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
                    <p>{formatDate(user.registered_at)}</p>
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
    </>
  );
}
