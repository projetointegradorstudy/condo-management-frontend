import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { NavbarMobile } from '../components/NavbarMobile';
import { Footer } from '../components/Footer';
import { ToggleButton } from '../components/ToggleButton';
import '../styles/layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="page">
      <ToggleButton />
      <div className="container-page">
        <div className="container-navbar">
          <Navbar />
          <NavbarMobile />
        </div>
        {children}
      </div>
      <Footer isFull />
    </div>
  );
}
