import { TextareaHTMLAttributes } from 'react';
import '../styles/textarea.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  message?: string;
}

export function TextArea({ message, ...props }: TextAreaProps) {
  return (
    <>
      <div style={{ marginBottom: message ? '0px' : '20px' }} className="textarea-content">
        <textarea {...props} />
      </div>
      <div className={message ? 'content-textarea-message' : ''}>
        <span>{message}</span>
      </div>
    </>
  );
}
