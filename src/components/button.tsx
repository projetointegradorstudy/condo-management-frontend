import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  isCancel?: boolean;
  isConfirm?: boolean;
  isFull?: boolean;
};

export function Button({ title, isCancel, isConfirm, isFull, ...props }: buttonProps) {
  return (
    <button
      className={`${isCancel ? 'button-cancel' : ''} ${isConfirm ? 'button-confirm' : ''} ${
        isFull ? 'button-full' : ''
      }`}
      {...props}
    >
      {title}
    </button>
  );
}
