import { XCircle } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { CancelRequestModal } from './CancelRequestModal';
import { ICancelRequest, IDataElementProps, IRequests } from '../interfaces';
import { useState } from 'react';

export function MyRequestTable({ data }: IDataElementProps<IRequests[]>) {
  const userFields = ['Ambiente', 'Check-in', 'Check-out', 'Status', 'Data da solicitação', ''];
  const { setIsOpenCancelRequestModal, formatDate } = getContext();
  const [isPosition, setIsPosition] = useState<ICancelRequest>({ id: '', name: '' });

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
            data.map((my_request: IRequests) => {
              return (
                <tr key={my_request.user.id}>
                  <td>
                    <h4>{my_request.environment.name}</h4>
                  </td>
                  <td>
                    <p>{formatDate(my_request.date_in)}</p>
                  </td>
                  <td>
                    <p>{formatDate(my_request.date_out)}</p>
                  </td>
                  <td>
                    <p>{my_request.status}</p>
                  </td>
                  <td>
                    <p>{formatDate(my_request.created_at)}</p>
                  </td>
                  <td>
                    <div className="content-buttons-my-requests">
                      <XCircle
                        className="icon-close"
                        weight="fill"
                        onClick={() => {
                          setIsOpenCancelRequestModal(true);
                          setIsPosition({ id: my_request.id, name: my_request.environment.name });
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <CancelRequestModal id={isPosition?.id} name={isPosition?.name} />
    </>
  );
}
