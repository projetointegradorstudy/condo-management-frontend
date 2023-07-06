import { DotsThreeCircleVertical, XCircle } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { IDataElementProps, IDeleteModal, IEditEnvironment, IEnvironment } from '../interfaces';
import imageDefault from '../assets/image-default.png';
import { DeleteModal } from './DeleteModal';
import { EditEnvironmentModal } from './EditEnvironmentModal';
import { useState } from 'react';
import { CreateEnvironmentModal } from './CreateEnvironmentModal';

export function EnvironmentTable({ data }: IDataElementProps<IEnvironment[]>) {
  const [isPosition, setIsPosition] = useState<IDeleteModal>({ id: '', name: '' });
  const [isEditPosition, setIsEditPosition] = useState<IEditEnvironment>({
    id: '',
    name: '',
    description: '',
    status: '',
    image: File[1],
    capacity: '',
  });
  const environmentFields = ['Imagem', 'Nome', 'Descrição', 'Capacidade', 'Status', 'Data de registro', ''];
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
                    <p>{environment.status}</p>
                  </td>
                  <td>
                    <p>{formatDate(environment.created_at)}</p>
                  </td>
                  <td>
                    <div className="content-buttons">
                      <DotsThreeCircleVertical
                        className="icon-edit"
                        weight="fill"
                        onClick={() => {
                          setIsPosition({ id: environment.id, name: environment.name });
                          setIsEditPosition({
                            id: environment.id,
                            name: environment.name,
                            description: environment.description,
                            status: environment.status,
                            image: environment.image,
                            capacity: environment.capacity,
                          });
                          setIsOpenEditModal(true);
                        }}
                      />

                      <XCircle
                        className="icon-close"
                        weight="fill"
                        onClick={() => {
                          setIsPosition({ id: environment.id, name: environment.name });
                          setIsOpenDeletModal(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <DeleteModal id={isPosition?.id} name={isPosition?.name} source="environment" />
      <EditEnvironmentModal
        id={isEditPosition.id}
        name={isEditPosition.name}
        description={isEditPosition.description}
        status={isEditPosition.status}
        image={isEditPosition.image}
        capacity={isEditPosition.capacity}
      />
      <CreateEnvironmentModal />
    </>
  );
}
