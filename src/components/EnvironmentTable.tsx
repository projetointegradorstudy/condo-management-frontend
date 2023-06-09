import { PencilSimpleLine, Trash } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IEnvironment } from '../interfaces';
import imageDefault from '../assets/image-default.png';

export function EnvironmentTable({ data }: IDataElementProps<IEnvironment[]>) {
  const environmentFields = ['Imagem', 'Nome', 'Descrição', 'Capacidade', 'Data de registro', ''];
  const { setIsOpenEditModal, setIsOpenDeletModal, formatDate } = getContext();

  return (
    <>
      <table>
        <thead>
          <tr>
            {environmentFields.map((field, index) => {
              return <th key={index}>{field}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((environment: IEnvironment) => {
              return (
                <tr key={environment.id}>
                  <td>
                    <img src={environment?.image ? environment.image : imageDefault} alt="No image" />
                  </td>
                  <td>
                    <h4>{environment.name}</h4>
                  </td>
                  <td>
                    <span className="column-description">{environment.description}</span>
                  </td>
                  <td>
                    <p>{environment.capacity}</p>
                  </td>
                  <td>
                    <p>{formatDate(environment.created_at)}</p>
                  </td>
                  <td>
                    <div className="content-buttons">
                      <button onClick={() => setIsOpenEditModal(true)}>
                        <PencilSimpleLine />
                      </button>
                      <button onClick={() => setIsOpenDeletModal(true)}>
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
