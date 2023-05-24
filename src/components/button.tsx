import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  isCancel?: boolean;
  isConfirm?: boolean;
};

export function Button({ title, isCancel, isConfirm, ...props }: buttonProps) {
  return (
    <button className={`button ${isCancel ? 'button-cancel' : ''} ${isConfirm ? 'button-confirm' : ''}`} {...props}>
      {title}
    </button>
  );
}
