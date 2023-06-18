import { useEffect } from 'react';
import { getContext } from '../utils/context-import';

export function CountDown() {
  const { isRemainingSeconds, setIsRemaingSeconds } = getContext();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (isRemainingSeconds && isRemainingSeconds <= 0) {
        clearInterval(countdownInterval);
      } else {
        setIsRemaingSeconds((prevSeconds) => prevSeconds && prevSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isRemainingSeconds]);

  return <span>{isRemainingSeconds}s</span>;
}
