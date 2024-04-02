import { useEffect, useState } from 'react';
import {
  House,
  ListChecks,
  SignOut,
  CaretRight,
  CaretLeft,
  Users,
  PencilSimpleLine,
  ListBullets,
  ListPlus,
} from 'phosphor-react';
import LogoLg from '../assets/logo_lg.svg';
import { NavLink } from 'react-router-dom';
import { getContext } from '../utils/context-import';
import avatarDefault from '../assets/avatar-default.png';
import { ConfirmSignoutModal } from './ConfirmSignoutModal';
import '../styles/navbar.scss';

export function Navbar() {
  const { isAdmin, setIsOpenConfirmSignoutModal, isMyselfData, isNeedRefresh, setIsNeedRefresh, getUserData } =
    getContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isNeedRefresh) {
      getUserData();
      setIsNeedRefresh(false);
    }
  }, [isNeedRefresh]);

  const navItemsAdmin = [
    {
      path: '/dashboard-admin',
      name: 'Página inicial',
      icon: <House size={isOpen ? 20 : 22} alt="Ícone página inicial" />,
    },
    {
      path: '/list-users',
      name: 'Lista de usuários',
      icon: <Users size={isOpen ? 20 : 22} alt="Ícone lista de usuários" />,
    },
    {
      path: '/list-environments',
      name: 'Lista de ambientes',
      icon: <ListPlus size={isOpen ? 20 : 22} alt="Ícone lista de ambientes" />,
    },
    {
      path: '/reservations',
      name: 'Reservas',
      icon: <ListChecks size={isOpen ? 20 : 22} alt="Ícone reservas" />,
    },
  ];

  const navItemsUser = [
    {
      path: '/menu-user',
      name: 'Ambientes',
      icon: <House size={isOpen ? 20 : 22} alt="Ícone página inicial" />,
    },
    {
      path: '/my-reservations',
      name: 'Minhas reservas',
      icon: <ListBullets size={isOpen ? 20 : 22} alt="Ícone minhas reservas" />,
    },
    {
      path: '/edit-profile',
      name: 'Editar perfil',
      icon: <PencilSimpleLine size={isOpen ? 18 : 20} alt="Ícone editar perfil" />,
    },
  ];

  const navItems = isAdmin ? navItemsAdmin : navItemsUser;

  return (
    <>
      <nav role="navigation" style={{ maxWidth: isOpen ? '250px' : '100px' }} className="primary-menu">
        <div className="content-button" style={{ justifyContent: isOpen ? 'flex-end' : 'center' }}>
          <button className="arrow-button" onClick={toggle}>
            {!isOpen ? <CaretRight size={22} /> : <CaretLeft size={22} />}
          </button>
        </div>
        <div className="logo">
          <img src={LogoLg} alt="Logo Condo Management" style={{ width: isOpen ? '130px' : '78px' }} />
        </div>
        <div className="profile" style={{ margin: isOpen ? '30px 30px 4px' : '0px 10px 10px' }}>
          <img
            src={isMyselfData?.avatar || avatarDefault}
            alt="Sua foto de perfil"
            style={{ width: isOpen ? '60px' : '40px', height: isOpen ? '60px' : '40px' }}
          />
          {isOpen && <strong>{isMyselfData?.name || isMyselfData?.email}</strong>}
        </div>
        <div className="middle-navbar" style={{ alignItems: isOpen ? '' : 'center' }}>
          <ul role="menubar" className="navbar-list">
            {navItems.map((navItem) => (
              <li role="none" key={navItem.name}>
                <NavLink
                  role="menuitem"
                  to={navItem.path}
                  style={{ justifyContent: isOpen ? '' : 'center', padding: isOpen ? '10px 1px 10px 18px' : '10px' }}
                  title={`${isOpen ? '' : navItem.name}`}
                  tabIndex={0}
                >
                  {navItem.icon}
                  <span style={{ display: !isOpen ? 'none' : 'block' }}>{navItem.name}</span>
                </NavLink>
              </li>
            ))}
            <div className="navbar-list-logout" title={`${isOpen ? '' : 'Sair'}`}>
              <button
                className="navbar-button-logout"
                onClick={() => setIsOpenConfirmSignoutModal(true)}
                style={{ justifyContent: isOpen ? '' : 'center', padding: isOpen ? '10px 1px 10px 20px' : '10px' }}
              >
                <SignOut size={isOpen ? 18 : 20} alt="Ícone sair" />
                <span style={{ display: !isOpen ? 'none' : 'block' }}>Sair</span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
      <ConfirmSignoutModal />
    </>
  );
}
