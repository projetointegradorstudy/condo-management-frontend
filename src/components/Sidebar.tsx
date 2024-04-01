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
import '../styles/sidebar.scss';

export function Sidebar() {
  const { isAdmin, setIsOpenConfirmSignoutModal } = getContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { isMyselfData, isNeedRefresh, setIsNeedRefresh, getUserData } = getContext();

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
      <aside style={{ maxWidth: isOpen ? '250px' : '100px' }} className="desktop">
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
            src={isMyselfData?.avatar || avatarDefault}
            alt="Sua foto de perfil"
            style={{ width: isOpen ? '60px' : '40px', height: isOpen ? '60px' : '40px' }}
          />
          {isOpen && <strong>{isMyselfData?.name || isMyselfData?.email}</strong>}
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
              style={{ padding: isOpen ? '10px 1px 10px 20px' : '10px' }}
              title={`${isOpen ? '' : 'Sair'}`}
            >
              <button
                className="sidebar-button-logout"
                onClick={() => setIsOpenConfirmSignoutModal(true)}
                style={{ justifyContent: isOpen ? '' : 'center' }}
              >
                <SignOut size={isOpen ? 18 : 20} alt="Ícone sair" />
                <span style={{ display: !isOpen ? 'none' : 'block' }}>Sair</span>
              </button>
            </div>
          </ul>
        </div>
      </aside>
      <ConfirmSignoutModal />
    </>
  );
}
