import { useEffect } from 'react';
import iconAccessibility from '../assets/acessibilidadepng.png';
import { getContext } from '../utils/context-import';
import { MoreAccessibility } from './MoreAccessibility';
import '../styles/toggle-button.scss';

export function ToggleButton() {
  const { setIsOpenAccessibilityModal, isNeedRefresh, setIsNeedRefresh, getUserData } = getContext();

  useEffect(() => {
    if (isNeedRefresh) {
      setIsNeedRefresh(false);
    }
  }, [isNeedRefresh]);

  return (
    <>
      <div className="theme-color-mode">
        <button className="toggle" onClick={() => setIsOpenAccessibilityModal(true)} title="+ Acessibilidade">
          <img src={iconAccessibility} alt="Ícone Acessibilidade" />
        </button>
      </div>
      <MoreAccessibility />
    </>
  );
}
