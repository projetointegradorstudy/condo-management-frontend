import { useContext, useState } from 'react';
import {
  House,
  UserPlus,
  PlusCircle,
  ListChecks,
  SignOut,
  CaretRight,
  CaretLeft,
  Users,
  ListDashes,
  PencilSimpleLine,
  ListBullets,
} from 'phosphor-react';
import '../styles/sidebar.scss';
import LogoLg from '../assets/logo_lg.svg';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(GlobalContext);

  if (!context) return null;

  const { signout, isAdmin } = context;

  const toggle = () => setIsOpen(!isOpen);

  const handleSubmit = () => {
    signout();
  };

  const navItemsAdmin = [
    {
      path: '/dashboard-admin',
      name: 'Página inicial',
      icon: <House size={isOpen ? 20 : 22} />,
    },
    {
      path: '/register-environment',
      name: 'Cadastro de ambientes',
      icon: <PlusCircle size={isOpen ? 20 : 22} />,
    },
    {
      path: '/list-users',
      name: 'Lista de usuários',
      icon: <Users size={isOpen ? 20 : 22} />,
    },
    {
      path: '/list-environments',
      name: 'Lista de ambientes',
      icon: <ListDashes size={isOpen ? 21 : 23} />,
    },
    {
      path: '/',
      name: 'Aprovaçõess',
      icon: <ListChecks size={isOpen ? 20 : 22} />,
    },
  ];

  const navItemsUser = [
    {
      path: '/menu-user',
      name: 'Ambientes',
      icon: <House size={isOpen ? 20 : 22} />,
    },
    {
      path: '/requests',
      name: 'Solicitações',
      icon: <ListBullets size={isOpen ? 21 : 23} />,
    },
    {
      path: '/edit-profile',
      name: 'Editar perfil',
      icon: <PencilSimpleLine size={isOpen ? 19 : 21} />,
    },
  ];

  const navItems = isAdmin ? navItemsAdmin : navItemsUser;

  return (
    <aside style={{ width: isOpen ? '250px' : '100px' }} className="desktop">
      <div className="content-button" style={{ justifyContent: isOpen ? 'flex-end' : 'center' }}>
        <div className="toggle-button">
          {!isOpen ? <CaretRight size={22} onClick={toggle} /> : <CaretLeft size={22} onClick={toggle} />}
        </div>
      </div>
      <div className="logo">
        <img src={LogoLg} alt="Logo Condo Management" style={{ width: isOpen ? '130px' : '78px' }} />
      </div>

      <div className="profile" style={{ margin: isOpen ? '30px 30px 4px' : '0px 10px 10px' }}>
        <img
          src="https://github.com/projetointegradorstudy.png"
          alt="avatar"
          style={{ width: isOpen ? '60px' : '40px', height: isOpen ? '60px' : '40px' }}
        />
      </div>

      <div className="middle-sidebar" style={{ alignItems: isOpen ? '' : 'center' }}>
        <ul className="sidebar-list">
          {navItems.map((navItem) => (
            <li key={navItem.name} style={{ padding: isOpen ? '10px 1px 10px 18px' : '10px' }}>
              <NavLink
                to={navItem.path}
                style={{ justifyContent: isOpen ? '' : 'center' }}
                title={`${isOpen ? '' : navItem.name}`}
              >
                {navItem.icon}
                <span style={{ display: !isOpen ? 'none' : 'block' }}>{navItem.name}</span>
              </NavLink>
            </li>
          ))}
          <div
            className="sidebar-list-logout"
            style={{ padding: isOpen ? '10px 1px 10px 18px' : '10px' }}
            title={`${isOpen ? '' : 'Sair'}`}
          >
            <button
              className="sidebar-button-logout"
              onClick={handleSubmit}
              style={{ justifyContent: isOpen ? '' : 'center' }}
            >
              <SignOut size={isOpen ? 18 : 20} />
              <span style={{ display: !isOpen ? 'none' : 'block' }}>Sair</span>
            </button>
          </div>
        </ul>
      </div>
    </aside>
  );
}
