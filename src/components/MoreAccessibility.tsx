import {
  CircleHalf,
  Cloud,
  Moon,
  Sun,
  X,
  PersonSimple,
  Link,
  Bookmarks,
  Cursor,
  MagnifyingGlassPlus,
  ArrowsHorizontal,
} from 'phosphor-react';
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
      class: 'button-theme',
    },
    {
      name: 'Contraste Escuro',
      icon: <Moon size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Dark),
      class: 'button-theme',
    },
    {
      name: 'Contraste Dessaturado',
      icon: <Cloud size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Desaturated),
      class: 'button-theme',
    },
    {
      name: 'Contraste Claro',
      icon: <Sun size={32} weight="fill" />,
      onclick: () => handleContrastTheme(contrastThemes.Light),
      class: 'button-theme',
    },
    {
      name: 'Dislexia',
      icon: <PersonSimple size={22} weight="fill" />,
      onclick: () => handleDyslexiaFont(),
      class: 'button-option',
    },
    {
      name: 'Links (Destaque)',
      icon: <Link size={22} weight="fill" />,
      onclick: () => handleHighlightElements(),
      class: 'button-option',
    },
    {
      name: 'Máscara de Leitura',
      icon: <Bookmarks size={22} weight="fill" />,
      onclick: () => handleReadingMask(),
      class: 'button-option',
    },
    {
      name: 'Cursor Grande',
      icon: <Cursor size={22} weight="fill" />,
      onclick: () => handleCustomCursor(),
      class: 'button-option',
    },
    {
      name: 'Zoom',
      icon: <MagnifyingGlassPlus size={22} weight="fill" />,
      onclick: () => handleZoom(),
      class: 'button-option',
    },
    {
      name: 'Espaçamento',
      icon: <ArrowsHorizontal size={22} weight="fill" />,
      onclick: () => handleLetterSpacing(),
      class: 'button-option',
    },
  ];

  const contrastThemes = {
    Dark: 'dark-contrast',
    Inverted: 'invert-contrast',
    Light: 'light-contrast',
    Desaturated: 'desaturated-contrast',
  };

  const accessibityFonts = {
    dyslexia: 'dyslexia',
  };

  const accessibityHighlightLink = {
    highlight: 'highlight-link',
  };

  const zoom = {
    one: 'zoom-one',
  };

  const customCursor = {
    custom: 'custom-cursor',
  };

  const letterSpacing = {
    one: 'letter-spacing-one',
  };

  const [isContrastTheme, setIsContrastTheme] = useState<string | null>(null);
  const [isDyslexiaFont, setIsDyslexiaFont] = useState<string | null>(null);
  const [isHighlightLink, setIsHighlightLink] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isZoom, setIsZoom] = useState<string | null>(null);
  const [isLetterSpacing, setIsLetterSpacing] = useState<string | null>(null);
  const [isCustomCursor, setIsCustomCursor] = useState<string | null>(null);

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

  const handleDyslexiaFont = useCallback(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      if (isDyslexiaFont === accessibityFonts.dyslexia) {
        bodyElement.classList.remove(accessibityFonts.dyslexia);
        setIsDyslexiaFont(null);
      } else {
        bodyElement.classList.add(accessibityFonts.dyslexia);
        setIsDyslexiaFont(accessibityFonts.dyslexia);
      }
    }
  }, [isDyslexiaFont]);

  const handleHighlightElements = useCallback(() => {
    const highlightElement = document.querySelector('body');

    if (highlightElement) {
      if (isHighlightLink === accessibityHighlightLink.highlight) {
        highlightElement.classList.remove(accessibityHighlightLink.highlight);
        setIsHighlightLink(null);
      } else {
        highlightElement.classList.add(accessibityHighlightLink.highlight);
        setIsHighlightLink(accessibityHighlightLink.highlight);
      }
    }
  }, [isHighlightLink]);

  const handleReadingMask = useCallback(() => {
    const heightRuler = 140;
    const hightCenter = heightRuler / 2;
    let beforeMouseY = 0;
    let heightTop = window.innerHeight / 2 - hightCenter;
    let heightBottom = window.innerHeight / 2 - hightCenter;

    if (isActive) {
      setIsActive(false);

      const topMask = document.getElementById('reading-mask-top');
      if (topMask) {
        document.body.removeChild(topMask);
      }

      const bottomMask = document.getElementById('reading-mask-bottom');
      if (bottomMask) {
        document.body.removeChild(bottomMask);
      }

      const ruler = document.getElementById('reading-mask-ruler');
      if (ruler) {
        document.body.removeChild(ruler);
      }
    } else {
      const topMask = document.createElement('div');
      topMask.id = 'reading-mask-top';
      document.body.appendChild(topMask);

      const bottomMask = document.createElement('div');
      bottomMask.id = 'reading-mask-bottom';
      document.body.appendChild(bottomMask);

      const ruler = document.createElement('div');
      ruler.id = 'reading-mask-ruler';
      document.body.appendChild(ruler);

      const handleMouseMove = (e: MouseEvent) => {
        const mouseY = e.clientY;

        const novaPosicaoRuler = Math.max(0, Math.min(window.innerHeight - heightRuler, mouseY - hightCenter));
        ruler.style.top = `${novaPosicaoRuler}px`;

        heightTop = Math.max(0, novaPosicaoRuler);
        heightBottom = Math.max(0, window.innerHeight - heightRuler - novaPosicaoRuler);

        topMask.style.height = `${heightTop}px`;
        bottomMask.style.height = `${heightBottom}px`;

        beforeMouseY = mouseY;
      };

      document.addEventListener('mousemove', handleMouseMove);

      setIsActive(true);

      return () => {
        document.body.removeChild(topMask);
        document.body.removeChild(bottomMask);
        document.body.removeChild(ruler);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isActive]);

  const handleZoom = useCallback(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      if (isZoom === zoom.one) {
        bodyElement.classList.remove(zoom.one);
        setIsZoom(null);
      } else {
        bodyElement.classList.add(zoom.one);
        setIsZoom(zoom.one);
      }
    }
  }, [isZoom]);

  const handleLetterSpacing = useCallback(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      if (isLetterSpacing === letterSpacing.one) {
        bodyElement.classList.remove(letterSpacing.one);
        setIsLetterSpacing(null);
      } else {
        bodyElement.classList.add(letterSpacing.one);
        setIsLetterSpacing(letterSpacing.one);
      }
    }
  }, [isLetterSpacing]);

  const handleCustomCursor = useCallback(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      if (isCustomCursor === customCursor.custom) {
        bodyElement.classList.remove(customCursor.custom);
        setIsCustomCursor(null);
      } else {
        bodyElement.classList.add(customCursor.custom);
        setIsCustomCursor(customCursor.custom);
      }
    }
  }, [isCustomCursor]);

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
                  <li key={navItemAccessibility.name} role="none" className={navItemAccessibility.class}>
                    <button
                      title={navItemAccessibility.name}
                      onClick={navItemAccessibility.onclick}
                      className={navItemAccessibility.class}
                    >
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
