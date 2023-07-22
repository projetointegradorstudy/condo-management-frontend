import { XCircle } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { CancelReservationModal } from './CancelReservationModal';
import { ICancelReservation, IDataElementProps, IReservations, handleStatus } from '../interfaces';
import { useState } from 'react';

export function MyReservationTable({ data }: IDataElementProps<IReservations[]>) {
  const userFields = ['#', 'Ambiente', 'Check-in', 'Check-out', 'Status', 'Data da solicitação', ''];
  const [isPosition, setIsPosition] = useState<ICancelReservation>({ id: '', name: '', index: 0 });
  const { setIsOpenCancelReservationModal, formatDate } = getContext();

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
            data.map((my_reservation: IReservations, index: number) => {
              return (
                <tr key={my_reservation.id}>
                  <td>
                    <h4>{(index += 1)}</h4>
                  </td>
                  <td>
                    <h4>{my_reservation.environment.name}</h4>
                  </td>
                  <td>
                    <p>{formatDate(my_reservation.date_in)}</p>
                  </td>
                  <td>
                    <p>{formatDate(my_reservation.date_out)}</p>
                  </td>
                  <td>
                    <p className={handleStatus[my_reservation.status].customClass}>
                      <b>{handleStatus[my_reservation.status].value}</b>
                    </p>
                  </td>
                  <td>
                    <p>{formatDate(my_reservation.created_at)}</p>
                  </td>
                  <td>
                    <div className="content-buttons-my-requests">
                      <XCircle
                        className={my_reservation.status != 'pending' ? 'disabled' : 'icon-close'}
                        weight="fill"
                        onClick={
                          my_reservation.status === 'pending'
                            ? () => {
                                setIsOpenCancelReservationModal(true);
                                setIsPosition({ id: my_reservation.id, name: my_reservation.environment.name, index });
                              }
                            : undefined
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <CancelReservationModal id={isPosition?.id} name={isPosition?.name} index={isPosition?.index} />
    </>
  );
}
