import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { House, List, ListChecks, PlusCircle, SignOut, UserPlus, UserList, X, ListDashes } from 'phosphor-react';
import { GlobalContext } from '../contexts/GlobalContext';
import '../styles/navbar-mobile.scss';

export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(GlobalContext);

  if (!context) return null;

  const { signout, isAdmin } = context;

  const handleSubmit = () => {
    signout();
  };

  const navItemsAdmin = [
    {
      path: '/dashboard-admin',
      name: 'Página inicial',
      icon: <House size={isOpen ? 22 : 26} />,
    },
    {
      path: '/register-user',
      name: 'Cadastro de pessoas',
      icon: <UserPlus size={isOpen ? 22 : 26} />,
    },
    {
      path: '/',
      name: 'Cadastro de ambientes',
      icon: <PlusCircle size={isOpen ? 22 : 26} />,
    },
    {
      path: '/list-users',
      name: 'Lista de usuários',
      icon: <UserList size={isOpen ? 22 : 26} />,
    },
    {
      path: '/list-environments',
      name: 'Lista de ambientes',
      icon: <ListDashes size={isOpen ? 20 : 22} />,
    },
    {
      path: '/',
      name: 'Aprovaçõess',
      icon: <ListChecks size={isOpen ? 22 : 26} />,
    },
  ];

  const navItemsUser = [
    {
      path: '/dashboard-admin',
      name: 'Ambientes',
      icon: <House size={isOpen ? 22 : 26} />,
    },
    {
      path: '/register-user',
      name: 'Solicitações',
      icon: <UserPlus size={isOpen ? 22 : 26} />,
    },
    {
      path: '/',
      name: 'Editar perfil',
      icon: <PlusCircle size={isOpen ? 22 : 26} />,
    },
  ];

  const navItems = isAdmin ? navItemsAdmin : navItemsUser;

  return (
    <div className="navbar-mobile">
      <nav>
        <button onClick={() => setIsOpen(!isOpen)}>{!isOpen ? <List size={26} /> : <X size={24} />}</button>
        <div>
          <ul style={{ transform: isOpen ? 'translateY(100%)' : 'translateY(0)' }}>
            <div className="profile">
              <img src="https://github.com/projetointegradorstudy.png" alt="avatar" />
            </div>
            <div className="navbar-items">
              {navItems.map((navItem) => (
                <li key={navItem.name}>
                  <>{navItem.icon}</>
                  <NavLink to={navItem.path}>
                    <span>{navItem.name}</span>
                  </NavLink>
                </li>
              ))}
            </div>
            <div className="sidebar-list-logout" style={{ width: isAdmin ? '188px' : '115px' }}>
              <button
                className="sidebar-button-logout"
                onClick={handleSubmit}
                style={{ justifyContent: isOpen ? '' : 'center' }}
              >
                <SignOut size={isOpen ? 20 : 26} />
                <span style={{ display: !isOpen ? 'none' : 'block' }}>Sair</span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
