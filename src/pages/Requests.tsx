import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { NavbarMobile } from '../components/NavbarMobile';
import { RequestTable } from '../components/RequestTable';
import { Sidebar } from '../components/Sidebar';
import '../styles/list-requests.scss';

export function Requests() {
  return (
    <>
      <div className="page-requests">
        <div className="container-requests">
          <Sidebar />
          <NavbarMobile />

          <div className="content-requests">
            <h1>Solicitações</h1>

            <div className="content-requests-list">
              <RequestTable />
            </div>
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
