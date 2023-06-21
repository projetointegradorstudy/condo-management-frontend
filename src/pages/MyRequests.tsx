import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { MyRequestTable } from '../components/MyRequestTable';
import { NavbarMobile } from '../components/NavbarMobile';

import { Sidebar } from '../components/Sidebar';
import '../styles/list-requests.scss';

export function MyRequests() {
  return (
    <>
      <div className="page-requests">
        <div className="container-requests">
          <Sidebar />
          <NavbarMobile />

          <div className="content-requests">
            <h1>Minhas solicitações</h1>

            <div className="content-requests-list">
              <MyRequestTable />
            </div>
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
