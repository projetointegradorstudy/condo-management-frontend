import { InputHTMLAttributes } from 'react';
import '../styles/input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
}

export function Input({ message, ...props }: InputProps) {
  return (
    <>
      <input {...props} className={message ? 'input-message' : ''} />
      <div className={message ? 'content-input-message' : ''}>
        <span>{message}</span>
      </div>
    </>
  );
}
