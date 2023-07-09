import { InputHTMLAttributes } from 'react';
import '../styles/input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
}

export function Input({ message, ...props }: InputProps) {
  return (
    <>
      <div style={{ marginBottom: message ? '0px' : '20px' }}>
        <input {...props} />
      </div>
      <div className={message ? 'content-input-message' : ''}>
        <span>{message}</span>
      </div>
    </>
  );
}
