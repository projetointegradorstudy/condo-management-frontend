import { Sidebar } from '../components/Sidebar';
import { NavbarMobile } from '../components/NavbarMobile';
import { CardEnvironment } from '../components/CardEnvironment';
import '../styles/menu-user.scss';

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
        <div className="content-title-user">
          <h2>Ambientes disponíveis</h2>
        </div>
        <div className="content-menu-user">
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
          <CardEnvironment />
        </div>
      </div>
    </div>
  );
}
