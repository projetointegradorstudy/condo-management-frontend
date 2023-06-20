// import { getContext } from '../utils/context-import';
import { Button } from './Button';

export function RequestTable() {
  const userFields = ['Ambiente', 'Nome', 'Qt de Pessoas', 'Data da solicitação', 'Status', 'Observações', ''];
  // const { formatDate } = getContext();

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
              <h4>User123</h4>
            </td>
            <td>
              <p>20</p>
            </td>
            <td>
              <p>19.06.23</p>
            </td>
            <td>
              <p>Pendente</p>
            </td>
            <td>
              <p>Lorem ipsum dolor sit, amet consectetur.</p>
            </td>
            <td>
              <div className="content-buttons-requests">
                <Button title="Aprovar" isConfirm />
                <Button title="Recusar" className="button-cancel-background " />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
