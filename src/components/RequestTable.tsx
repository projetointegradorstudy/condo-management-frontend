import { CheckCircle, XCircle } from 'phosphor-react';
import { ApproveRequestModal } from './ApproveRequestModal';
import { getContext } from '../utils/context-import';
import { DisapproveRequestModal } from './DisapproveRequestModal';
import { IApproveRequest, IDataElementProps, IDisapproveRequest, IRequests } from '../interfaces';
import { useState } from 'react';

export function RequestTable({ data }: IDataElementProps<IRequests[]>) {
  const userFields = [
    '#',
    'Ambiente',
    'Solicitante',
    'Email',
    'Check-in',
    'Check-out',
    'Status',
    'Data da solicitação',
    '',
  ];
  const [isDisapprovePosition, setIsDisapprovePosition] = useState<IDisapproveRequest>({ id: '', name: '', index: 0 });
  const [isApprovePosition, setIsApprovePosition] = useState<IApproveRequest>({ id: '', name: '', index: 0 });
  const { setIsOpenApproveRequestModal, setIsOpenDisapproveRequestModal, formatDate } = getContext();

  return (
    <>
      <table>
        <thead>
          <tr>
            {userFields.map((field, index) => {
              return <th key={index}>{field}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((request: IRequests, index: number) => {
              return (
                <tr key={request.id}>
                  <td>
                    <h4>{(index += 1)}</h4>
                  </td>
                  <td>
                    <h4>{request.environment.name}</h4>
                  </td>
                  <td>
                    <p>{request.user.name}</p>
                  </td>
                  <td>
                    <p>{request.user.email}</p>
                  </td>
                  <td>
                    <p>{formatDate(request.date_in)}</p>
                  </td>
                  <td>
                    <p>{formatDate(request.date_out)}</p>
                  </td>
                  <td>
                    <p>{request.status}</p>
                  </td>
                  <td>
                    <p>{formatDate(request.created_at)}</p>
                  </td>
                  <td>
                    <div className="content-buttons-requests">
                      <CheckCircle
                        className="icon-check"
                        weight="fill"
                        onClick={() => {
                          setIsOpenApproveRequestModal(true);
                          setIsApprovePosition({ id: request.id, name: request.environment.name, index });
                        }}
                      />
                      <XCircle
                        className="icon-close"
                        weight="fill"
                        onClick={() => {
                          setIsOpenDisapproveRequestModal(true);
                          setIsDisapprovePosition({ id: request.id, name: request.environment.name, index });
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ApproveRequestModal id={isApprovePosition?.id} name={isApprovePosition?.name} index={isApprovePosition?.index} />
      <DisapproveRequestModal
        id={isDisapprovePosition?.id}
        name={isDisapprovePosition?.name}
        index={isDisapprovePosition?.index}
      />
    </>
  );
}
