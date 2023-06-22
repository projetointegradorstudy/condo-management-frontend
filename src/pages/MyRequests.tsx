import { Footer } from '../components/Footer';
import { MyRequestTable } from '../components/MyRequestTable';
import { NavbarMobile } from '../components/NavbarMobile';
import { Sidebar } from '../components/Sidebar';
import '../styles/list-my-requests.scss';

export function MyRequests() {
  return (
    <>
      <div className="page-my-requests">
        <div className="container-my-requests">
          <Sidebar />
          <NavbarMobile />

          <div className="content-my-requests">
            <h1>Minhas solicitações</h1>

            <div className="content-my-requests-list">
              <MyRequestTable />
            </div>
          </div>
        </div>
      </div>
      <Footer isFull />
    </>
  );
}
