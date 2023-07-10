import { InputHTMLAttributes } from 'react';
import '../styles/input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
  isNotRequired?: boolean;
  isUploadFile?: boolean;
}

export function Input({ message, isNotRequired, isUploadFile, ...props }: InputProps) {
  return (
    <>
      <div
        className="input-content"
        style={{ marginBottom: message ? '0px' : '20px', display: isUploadFile ? 'none' : 'block' }}
      >
        <input {...props} />
      </div>

      <div className={message ? 'content-input-message' : ''} style={{ display: isNotRequired ? 'none' : 'block' }}>
        <span>{message}</span>
      </div>
    </>
  );
}
