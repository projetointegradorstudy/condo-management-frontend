import { useState } from 'react';
import { CaretDown, PencilSimpleLine, SignOut } from 'phosphor-react';
import LogoLgWhite from '../assets/logo_lg_white.svg';
import '../styles/navbaruser.scss';

export function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar-user">
      <div className="navbar-user-logo">
        <img src={LogoLgWhite} alt="logo" />
      </div>
      <div className="navbar-user-profile">
        <div className="navbar-user-avatar">
          <img src="https://github.com/projetointegradorstudy.png" alt="avatar" />
        </div>
        <div className="navbar-user-arrow-menu">
          <button onClick={() => setIsOpen(!isOpen)}>
            <CaretDown weight="fill" />
          </button>
        </div>
      </div>
      <div className="navbar-user-content" style={{ display: !isOpen ? 'none' : 'block' }}>
        <nav>
          <ul>
            <li>
              <a href="/">
                <PencilSimpleLine />
                Editar perfil
              </a>
            </li>
            <li>
              <a href="/">
                <SignOut />
                Sair
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
