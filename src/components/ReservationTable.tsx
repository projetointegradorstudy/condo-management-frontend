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
            data.map((reservations: IReservations, index: number) => {
              return (
                <tr key={reservations.id}>
                  <td>
                    <h4>{(index += 1)}</h4>
                  </td>
                  <td>
                    <h4>{reservations.environment.name}</h4>
                  </td>
                  <td>
                    <p>{reservations.user.name}</p>
                  </td>
                  <td>
                    <p>{reservations.user.email}</p>
                  </td>
                  <td>
                    <p>{formatDate(reservations.date_in)}</p>
                  </td>
                  <td>
                    <p>{formatDate(reservations.date_out)}</p>
                  </td>
                  <td>
                    <p
                      className={
                        reservations.status === 'approved'
                          ? 'status-approved'
                          : reservations.status === 'pending'
                          ? 'status-pending'
                          : reservations.status === 'not_approved'
                          ? 'status-not-approved'
                          : 'status-cancelled'
                      }
                    >
                      {reservations.status}
                    </p>
                  </td>
                  <td>
                    <p>{formatDate(reservations.created_at)}</p>
                  </td>
                  <td>
                    {reservations.status === 'pending' ? (
                      <div className="content-buttons-requests">
                        <CheckCircle
                          className="icon-check"
                          weight="fill"
                          onClick={() => {
                            setIsOpenApproveReservationModal(true);
                            setIsApprovePosition({ id: reservations.id, name: reservations.environment.name, index });
                          }}
                        />
                        <XCircle
                          className="icon-close"
                          weight="fill"
                          onClick={() => {
                            setIsOpenDisapproveReservationModal(true);
                            setIsDisapprovePosition({
                              id: reservations.id,
                              name: reservations.environment.name,
                              index,
                            });
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
