import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  House,
  List,
  ListChecks,
  PlusCircle,
  SignOut,
  X,
  ListDashes,
  Users,
  PencilSimpleLine,
  ListBullets,
} from 'phosphor-react';
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
      icon: <House size={18} />,
    },
    {
      path: '/register-environment',
      name: 'Cadastro de ambientes',
      icon: <PlusCircle size={18} />,
    },
    {
      path: '/list-users',
      name: 'Lista de usuários',
      icon: <Users size={18} />,
    },
    {
      path: '/list-environments',
      name: 'Lista de ambientes',
      icon: <ListDashes size={18} />,
    },
    {
      path: '/',
      name: 'Aprovações',
      icon: <ListChecks size={18} />,
    },
  ];

  const navItemsUser = [
    {
      path: '/menu-user',
      name: 'Ambientes',
      icon: <House size={18} />,
    },
    {
      path: ';requests',
      name: 'Solicitações',
      icon: <ListBullets size={18} />,
    },
    {
      path: '/edit-profile',
      name: 'Editar perfil',
      icon: <PencilSimpleLine size={18} />,
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
                <SignOut size={16} />
                <span style={{ display: !isOpen ? 'none' : 'block' }}>Sair</span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
