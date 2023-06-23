import { CheckCircle, XCircle } from 'phosphor-react';
import { ApproveRequestModal } from './ApproveRequestModal';
import { getContext } from '../utils/context-import';
import { DisapproveRequestModal } from './DisapproveRequestModal';
import { IDataElementProps, IRequests } from '../interfaces';

export function RequestTable({ data }: IDataElementProps<IRequests[]>) {
  const userFields = ['Ambiente', 'Solicitante', 'Email', 'Check-in', 'Check-out', 'Status', 'Data da solicitação', ''];
  const { setIsOpenApproveRequestModal, setIsOpenDisapproveRequestModal, formatDate } = getContext();

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
            data.map((request: IRequests) => {
              return (
                <tr key={request.id}>
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
                        onClick={() => setIsOpenApproveRequestModal(true)}
                      />
                      <XCircle
                        className="icon-close"
                        weight="fill"
                        onClick={() => setIsOpenDisapproveRequestModal(true)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ApproveRequestModal />
      <DisapproveRequestModal />
    </>
  );
}
