import { useCallback, useEffect, useState } from 'react';
import { ToggleLeft, ToggleRight } from 'phosphor-react';
import '../styles/toggle-button.scss';

export function ToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTheme = useCallback(() => {
    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      if (isDarkMode) {
        htmlElement.classList.remove('dark');
      } else {
        htmlElement.classList.add('dark');
      }
      setIsDarkMode(!isDarkMode);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      setIsDarkMode(htmlElement.classList.contains('dark'));
    }
  }, []);

  return (
    <div className="theme-color-mode">
      <button className="toggle" onClick={handleTheme}>
        {isDarkMode ? (
          <ToggleRight className="light" size={40} weight="fill" />
        ) : (
          <ToggleLeft className="dark" size={40} weight="fill" />
        )}
      </button>
      <span className={isDarkMode ? 'light' : 'dark'}>{isDarkMode ? 'Dark' : 'Light'} Mode</span>
    </div>
  );
}
