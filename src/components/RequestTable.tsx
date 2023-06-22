import { CheckCircle, XCircle } from 'phosphor-react';

export function RequestTable() {
  const userFields = ['Ambiente', 'Solicitante', 'Check-in', 'Check-out', 'Status', 'Data da solicitação', ''];

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
          <tr>
            <td>
              <h4>Piscina</h4>
            </td>
            <td>
              <p>User123</p>
            </td>
            <td>
              <p>22.06.23 08:00</p>
            </td>
            <td>
              <p>22.06.23 10:00</p>
            </td>
            <td>
              <p>Pendente</p>
            </td>
            <td>
              <p>22.06.23</p>
            </td>
            <td>
              <div className="content-buttons-requests">
                <CheckCircle className="icon-check" weight="fill" />
                <XCircle className="icon-close" weight="fill" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
