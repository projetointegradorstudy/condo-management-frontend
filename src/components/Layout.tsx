import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { NavbarMobile } from '../components/NavbarMobile';
import { Footer } from '../components/Footer';
import { ToggleButton } from '../components/ToggleButton';
import '../styles/layout.scss';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

export function Layout({ children, showNavbar = true }: LayoutProps) {
  return (
    <div className="page">
      <ToggleButton />
      <div className="container-page" style={{ display: showNavbar ? 'flex' : 'block' }}>
        {showNavbar && (
          <div className="container-navbar">
            <Navbar />
            <NavbarMobile />
          </div>
        )}
        {children}
      </div>
      <div
        className={`content-footer ${showNavbar ? '' : 'bg-transparent'}`}
        style={{ width: showNavbar ? '100%' : '55.5%' }}
      >
        <Footer />
      </div>
    </div>
  );
}
