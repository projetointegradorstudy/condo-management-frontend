import { useContext, useState } from 'react';
import {
  House,
  UserPlus,
  PlusCircle,
  ListChecks,
  BracketsSquare,
  SignOut,
  CaretRight,
  CaretLeft,
  Users,
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

  const navItemsAdmin = [
    {
      path: '/dashboard-admin',
      name: 'Página inicial',
      icon: <House size={isOpen ? 20 : 26} />,
    },
    {
      path: '/register-user',
      name: 'Cadastro de pessoas',
      icon: <UserPlus size={isOpen ? 20 : 26} />,
    },
    {
      path: '/',
      name: 'Cadastro de ambientes',
      icon: <PlusCircle size={isOpen ? 20 : 26} />,
    },
    {
      path: '/list-users',
      name: 'Lista de usuários',
      icon: <Users size={isOpen ? 20 : 26} />,
    },
    {
      path: '/',
      name: 'Aprovaçõess',
      icon: <ListChecks size={isOpen ? 20 : 26} />,
    },
    {
      path: '/',
      name: 'Logs',
      icon: <BracketsSquare size={isOpen ? 20 : 26} />,
    },
  ];

  const navItemsUser = [
    {
      path: '/dashboard-admin',
      name: 'Ambientes',
      icon: <House size={isOpen ? 20 : 26} />,
    },
    {
      path: '/register-user',
      name: 'Solicitações',
      icon: <UserPlus size={isOpen ? 20 : 26} />,
    },
    {
      path: '/',
      name: 'Editar perfil',
      icon: <PlusCircle size={isOpen ? 20 : 26} />,
    },
  ];

  const handleSubmit = () => {
    signout();
  };

  const navItems = isAdmin ? navItemsAdmin : navItemsUser;

  return (
    <aside style={{ width: isOpen ? '250px' : '100px' }} className="desktop">
      <div className="content-button" style={{ justifyContent: isOpen ? 'flex-end' : 'center' }}>
        <div className="toggle-button">
          {!isOpen ? <CaretRight size={22} onClick={toggle} /> : <CaretLeft size={22} onClick={toggle} />}
        </div>
      </div>
      <div className="logo">
        <img src={LogoLg} alt="Logo Condo Management" style={{ width: isOpen ? '139px' : '78px' }} />
      </div>

      <div className="profile" style={{ margin: isOpen ? '0px 30px 30px' : '0px 10px 10px' }}>
        <img
          src="https://github.com/projetointegradorstudy.png"
          alt="avatar"
          style={{ width: isOpen ? '60px' : '46px', height: isOpen ? '60px' : '46px' }}
        />

        {isOpen ? (
          <>
            <h4>Lorem Ipsum</h4>
            <span>Admin | Lorem Ipsum</span>
          </>
        ) : (
          ''
        )}
      </div>

      <div className="middle-sidebar" style={{ alignItems: isOpen ? '' : 'center' }}>
        <ul className="sidebar-list">
          {navItems.map((navItem) => (
            <li key={navItem.name} style={{ padding: isOpen ? '10px 1px 10px 18px' : '10px' }}>
              <NavLink to={navItem.path} style={{ justifyContent: isOpen ? '' : 'center' }}>
                {navItem.icon}
                <span style={{ display: !isOpen ? 'none' : 'block' }}>{navItem.name}</span>
              </NavLink>
            </li>
          ))}
          <div className="sidebar-list-logout" style={{ padding: isOpen ? '10px 1px 10px 18px' : '10px' }}>
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
    </aside>
  );
}
