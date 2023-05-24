import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import '../styles/menuuser.scss';

export function MenuUser() {
  return (
    <div className="page-menu-user">
      <Sidebar />
      <NavbarMobile />
      <div className="container-menu-user">
        <div className="content-welcome-user">
          <h1>
            Seja bem-vindo(a),
            <br />
            <b>UserName</b>
          </h1>
        </div>
        <div className="content-main"></div>
      </div>
    </div>
  );
}
