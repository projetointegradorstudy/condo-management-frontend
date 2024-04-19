import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { House, List, ListChecks, SignOut, X, Users, PencilSimpleLine, ListBullets, ListPlus } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import avatarDefault from '../assets/avatar-default.png';
import { ConfirmSignoutModal } from './ConfirmSignoutModal';
import '../styles/navbar-mobile.scss';

export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isMyselfData, isNeedRefresh, setIsNeedRefresh, getUserData, setIsOpenConfirmSignoutModal } =
    getContext();

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
      icon: <House size={18} alt="Ícone página inicial" />,
    },
    {
      path: '/list-users',
      name: 'Lista de usuários',
      icon: <Users size={18} alt="Ícone lista de usuários" />,
    },
    {
      path: '/list-environments',
      name: 'Lista de ambientes',
      icon: <ListPlus size={18} alt="Ícone lista de ambientes" />,
    },
    {
      path: '/reservations',
      name: 'Reservas',
      icon: <ListChecks size={18} alt="Ícone reservas" />,
    },
  ];

  const navItemsUser = [
    {
      path: '/menu-user',
      name: 'Ambientes',
      icon: <House size={18} alt="Ícone página inicial" />,
    },
    {
      path: '/my-reservations',
      name: 'Minhas reservas',
      icon: <ListBullets size={18} alt="Ícone minhas reservas" />,
    },
    {
      path: '/edit-profile',
      name: 'Editar perfil',
      icon: <PencilSimpleLine size={18} alt="Ícone editar perfil" />,
    },
  ];

  const navItems = isAdmin ? navItemsAdmin : navItemsUser;

  return (
    <>
      <div className="navbar-mobile">
        <nav role="navigation" className="primary-menu-mobile">
          <button tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <List size={26} /> : <X size={24} />}
          </button>
          <div>
            <ul role="menubar" style={{ transform: isOpen ? 'translateY(100%)' : 'translateY(0)' }}>
              <div className="profile">
                <img src={isMyselfData?.avatar || avatarDefault} alt="Sua foto de perfil" />
                <strong>{isMyselfData?.name || isMyselfData?.email}</strong>
              </div>
              <div className="navbar-items" style={{ width: isAdmin ? '220px' : '180px' }}>
                {navItems.map((navItem) => (
                  <li role="none" key={navItem.name}>
                    <NavLink
                      role="menuitem"
                      tabIndex={0}
                      to={navItem.path}
                      onClick={() => setIsOpen(!isOpen)}
                      style={{ width: isAdmin ? '220px' : '180px' }}
                    >
                      {navItem.icon}
                      <span>{navItem.name}</span>
                    </NavLink>
                  </li>
                ))}
              </div>
              <div className="sidebar-list-logout" style={{ width: isAdmin ? '220px' : '180px' }}>
                <button className="sidebar-button-logout" onClick={() => setIsOpenConfirmSignoutModal(true)}>
                  <SignOut size={16} alt="Ícone sair" />
                  <span>Sair</span>
                </button>
              </div>
            </ul>
          </div>
        </nav>
      </div>
      <ConfirmSignoutModal />
    </>
  );
}
