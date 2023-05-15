import { useState } from 'react';
import { List, X } from 'phosphor-react';
import '../styles/navbarmobile.scss';

const navItems = [
  {
    path: '/',
    name: 'Página inicial',
  },
  {
    path: '/',
    name: 'Cadastro de pessoas',
  },
  {
    path: '/',
    name: 'Cadastro de ambientes',
  },
  {
    path: '/',
    name: 'Aprovaçõess',
  },
  {
    path: '/',
    name: 'Logs',
  },
  {
    path: '/',
    name: 'Sair',
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
            {navItems.map((navItem) => (
              <li key={navItem.name}>
                <a href={navItem.path}>
                  <span>{navItem.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
