import { PencilSimpleLine, Trash } from 'phosphor-react';
import avatarDefault from '../assets/avatar-default.png';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IEnvironment } from '../interfaces';

export function EnvironmentTable({ data }: IDataElementProps<IEnvironment[]>) {
  const environmentFields = ['Imagem', 'Nome', 'Descrição', 'Capacidade', 'Data de registro', ''];
  const { setOpenEditModal, setOpenDeletModal, formatDate } = getContext();

  return (
    <>
      <table>
        <thead>
          <tr>
            {environmentFields.map((field, index) => {
              return <th key={index}>{field} </th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((environment: IEnvironment) => {
              return (
                <tr key={environment.id}>
                  <td>
                    <img src={environment?.image ? environment.image : avatarDefault} alt="No image" />
                  </td>
                  <td>
                    <h4>{environment.name}</h4>
                  </td>
                  <td>
                    <p>{environment.description}</p>
                  </td>
                  <td>
                    <p>{environment.capacity}</p>
                  </td>
                  <td>
                    <p>{formatDate(environment.created_at)}</p>
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
