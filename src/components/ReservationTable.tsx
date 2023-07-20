import { CheckCircle, XCircle } from 'phosphor-react';
import { ApproveReservationModal } from './ApproveReservationModal';
import { getContext } from '../utils/context-import';
import { DisapproveReservationModal } from './DisapproveReservationModal';
import { IApproveReservation, IDataElementProps, IDisapproveReservation, IReservations } from '../interfaces';
import { useState } from 'react';

export function ReservationTable({ data }: IDataElementProps<IReservations[]>) {
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
  const [isDisapprovePosition, setIsDisapprovePosition] = useState<IDisapproveReservation>({
    id: '',
    name: '',
    index: 0,
  });
  const [isApprovePosition, setIsApprovePosition] = useState<IApproveReservation>({ id: '', name: '', index: 0 });
  const { setIsOpenApproveReservationModal, setIsOpenDisapproveReservationModal, formatDate } = getContext();

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
            data.map((request: IReservations, index: number) => {
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
                    {request.status === 'pending' ? (
                      <div className="content-buttons-requests">
                        <CheckCircle
                          className="icon-check"
                          weight="fill"
                          onClick={() => {
                            setIsOpenApproveReservationModal(true);
                            setIsApprovePosition({ id: request.id, name: request.environment.name, index });
                          }}
                        />
                        <XCircle
                          className="icon-close"
                          weight="fill"
                          onClick={() => {
                            setIsOpenDisapproveReservationModal(true);
                            setIsDisapprovePosition({ id: request.id, name: request.environment.name, index });
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ApproveReservationModal
        id={isApprovePosition?.id}
        name={isApprovePosition?.name}
        index={isApprovePosition?.index}
      />
      <DisapproveReservationModal
        id={isDisapprovePosition?.id}
        name={isDisapprovePosition?.name}
        index={isDisapprovePosition?.index}
      />
    </>
  );
}
