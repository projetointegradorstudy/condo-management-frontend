import { PencilSimpleLine, Trash } from 'phosphor-react';
import avatarDefault from '../assets/avatar-default.png';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IDeleteModal, IEditModal, IUser, Role } from '../interfaces';
import { DeleteUserModal } from './DeleteUserModal';
import { EditUserModal } from './EditUserModal';
import { CreateUserModal } from './CreateUserModal';
import { useState } from 'react';

export function UserTable({ data }: IDataElementProps<IUser[]>) {
  const [isPosition, setIsPosition] = useState<IDeleteModal>({ id: '', name: '' });
  const [isEditPosition, setIsEditPosition] = useState<IEditModal>({
    avatar: '',
    password: '',
    passwordConfirmation: '',
    created_at: '',
    role: Role.ADMIN || Role.USER,
  });
  const userFields = ['Avatar', 'Nome', 'Email', 'Tipo', 'Ativo', 'Data de registro', ''];
  const { setIsOpenEditModal, setIsOpenDeletModal, formatDate } = getContext();

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
                    <p>{user.email}</p>
                  </td>
                  <td>
                    <p>{user.role}</p>
                  </td>
                  <td>
                    <p>{user.is_active ? 'sim' : 'não'}</p>
                  </td>
                  <td>
                    <p>{formatDate(user.created_at)}</p>
                  </td>
                  <td>
                    <div className="content-buttons">
                      <button
                        onClick={() => {
                          setIsPosition({ id: user.id, name: user.email });
                          setIsEditPosition({
                            avatar: user.avatar,
                            password: user.password,
                            passwordConfirmation: user.passwordConfirmation,
                            created_at: user.created_at,
                            role: user.role,
                          });
                          setIsOpenEditModal(true);
                        }}
                      >
                        <PencilSimpleLine />
                      </button>
                      <button
                        onClick={() => {
                          setIsPosition({ id: user.id, name: user.email });
                          setIsOpenDeletModal(true);
                        }}
                      >
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <DeleteUserModal id={isPosition?.id} name={isPosition?.name} />
      <EditUserModal
        avatar={isEditPosition?.avatar}
        password={isEditPosition?.password}
        passwordConfirmation={isEditPosition.passwordConfirmation}
        created_at={isEditPosition.created_at}
        role={isEditPosition.role}
      />
      <CreateUserModal />
    </>
  );
}
