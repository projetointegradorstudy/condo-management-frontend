import { CircleHalf, Cloud, Moon, Sun, X } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import '../styles/more-accessibility.scss';
import { useCallback, useEffect, useState } from 'react';

export function MoreAccessibility() {
  const { isOpenAccessibilityModal, setIsOpenAccessibilityModal } = getContext();

  const handleCloser = () => {
    setIsOpenAccessibilityModal(false);
  };

  const navItemsAccessibility = [
    {
      name: 'Contraste Invertido',
      icon: <CircleHalf size={32} weight="fill" />,
    },
    {
      name: 'Contraste Escuro',
      icon: <Moon size={32} weight="fill" />,
      onclick: () => handleTheme(),
    },
    {
      name: 'Contraste Dessaturado',
      icon: <Cloud size={32} weight="fill" />,
    },
    {
      name: 'Contraste Claro',
      icon: <Sun size={32} weight="fill" />,
    },
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTheme = useCallback(() => {
    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      if (isDarkMode) {
        htmlElement.classList.remove('dark-contrast');
      } else {
        htmlElement.classList.add('dark-contrast');
      }
      setIsDarkMode(!isDarkMode);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      setIsDarkMode(htmlElement.classList.contains('dark-contrast'));
    }
  }, []);

  if (isOpenAccessibilityModal) {
    return (
      <div role="banner" className="accessibility-player">
        <div className="accessibility-player-header">
          <h3>Selecione uma ação</h3>
          <button className="button-close" onClick={handleCloser}>
            <X size={24} />
          </button>
        </div>
        <div className="accessibility-player-container">
          <div className="accessibility-player-bg">
            <nav role="navigation" className="acessibility-controls-menu">
              <ul role="menubar">
                {navItemsAccessibility.map((navItemAccessibility) => (
                  <li key={navItemAccessibility.name} role="none">
                    <button title={navItemAccessibility.name} onClick={navItemAccessibility.onclick}>
                      {navItemAccessibility.icon}
                      <span>{navItemAccessibility.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
