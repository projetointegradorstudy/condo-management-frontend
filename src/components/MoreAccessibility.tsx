import { CircleHalf, Cloud, Moon, Sun, X } from 'phosphor-react';
import { getContext } from '../utils/context-import';
import { useCallback, useState } from 'react';
import '../styles/more-accessibility.scss';

export function MoreAccessibility() {
  const { isOpenAccessibilityModal, setIsOpenAccessibilityModal } = getContext();

  const handleCloser = () => {
    setIsOpenAccessibilityModal(false);
  };

  const navItemsAccessibility = [
    {
      name: 'Contraste Invertido',
      icon: <CircleHalf size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Inverted),
    },
    {
      name: 'Contraste Escuro',
      icon: <Moon size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Dark),
    },
    {
      name: 'Contraste Dessaturado',
      icon: <Cloud size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Desaturated),
    },
    {
      name: 'Contraste Claro',
      icon: <Sun size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Light),
    },
  ];

  const contrastThemes = {
    Dark: 'dark-contrast',
    Inverted: 'invert-contrast',
    Light: 'light-contrast',
    Desaturated: 'desaturated-contrast',
  };

  const [isContrastTheme, setIsContrastTheme] = useState<string | null>(null);

  const handleContrastTheme = useCallback(
    (theme: string) => {
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        if (isContrastTheme === theme) {
          htmlElement.classList.remove(theme);
          setIsContrastTheme(null);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          htmlElement.classList.remove(isContrastTheme!);
          htmlElement.classList.add(theme);
          setIsContrastTheme(theme);
        }
      }
    },
    [isContrastTheme],
  );

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
