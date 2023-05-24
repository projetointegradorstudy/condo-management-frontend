import { useState } from 'react';
import { BracketsSquare, House, List, ListChecks, PlusCircle, SignOut, UserPlus, Users, X } from 'phosphor-react';
import '../styles/navbarmobile.scss';

const navItems = [
  {
    path: '/dashboard-admin',
    name: 'Página inicial',
    icon: <House />,
  },
  {
    path: '/register-user',
    name: 'Cadastro de pessoas',
    icon: <UserPlus />,
  },
  {
    path: '/',
    name: 'Cadastro de ambientes',
    icon: <PlusCircle />,
  },
  {
    path: '/list-users',
    name: 'Lista de usuários',
    icon: <Users />,
  },
  {
    path: '/',
    name: 'Aprovaçõess',
    icon: <ListChecks />,
  },
  {
    path: '/',
    name: 'Logs',
    icon: <BracketsSquare />,
  },
  {
    path: '/',
    name: 'Sair',
    icon: <SignOut />,
  },
];

export function NavibarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="navbar-mobile">
      <nav>
        <button onClick={() => setIsOpen(!isOpen)}>{!isOpen ? <List size={26} /> : <X size={24} />}</button>
        <div>
          <ul style={{ transform: isOpen ? 'translateY(100%)' : 'translateY(0)' }}>
            <div className="profile">
              <img src="https://github.com/projetointegradorstudy.png" alt="avatar" />
              <h4>Lorem Ipsum</h4>
              <span>Admin | Lorem Ipsum</span>
            </div>
            <div className="navbar-items">
              {navItems.map((navItem) => (
                <li key={navItem.name}>
                  <>{navItem.icon}</>
                  <a href={navItem.path}>
                    <span>{navItem.name}</span>
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
