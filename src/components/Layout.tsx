import React, { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
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
          <Sidebar />
          <NavbarMobile />
        </div>

        {children}
      </div>
      <Footer isFull />
    </div>
  );
}
