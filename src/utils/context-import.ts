import { useContext } from 'react';
import { GlobalContext, GlobalContextProps } from '../contexts/GlobalContext';

export const getContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  return context;
};
