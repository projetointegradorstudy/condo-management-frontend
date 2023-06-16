import { PencilSimpleLine, Trash } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IDeleteModal, IEditEnvironment, IEnvironment } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import { DeleteModal } from './DeleteModal';
import { EditEnvironmentModal } from './EditEnvironmentModal';
import { useState } from 'react';

export function EnvironmentTable({ data }: IDataElementProps<IEnvironment[]>) {
  const [isPosition, setIsPosition] = useState<IDeleteModal>({ id: '', name: '' });
  const [isEditPosition, setIsEditPosition] = useState<IEditEnvironment>({
    name: '',
    description: '',
    status: '',
    image: '',
    capacity: '',
  });
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
                      <button
                        onClick={() => {
                          setIsPosition({ id: environment.id, name: environment.name });
                          setIsEditPosition({
                            name: environment.name,
                            description: environment.description,
                            status: environment.status,
                            image: environment.image,
                            capacity: environment.capacity,
                          });
                          setIsOpenEditModal(true);
                        }}
                      >
                        <PencilSimpleLine />
                      </button>
                      <button
                        onClick={() => {
                          setIsPosition({ id: environment.id, name: environment.name });
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
      <DeleteModal id={isPosition?.id} name={isPosition?.name} />
      <EditEnvironmentModal
        name={isEditPosition.name}
        description={isEditPosition.description}
        status={isEditPosition.status}
        image={isEditPosition.image}
        capacity={isEditPosition.capacity}
      />
    </>
  );
}
