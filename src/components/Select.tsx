import { SelectHTMLAttributes } from 'react';
import '../styles/select.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  message?: string;
}
export function Select({ message, ...props }: SelectProps) {
  return (
    <>
      <div className="select-content" style={{ marginBottom: message ? '0px' : '20px' }}>
        <select {...props}>
          <option disabled value="">
            --
          </option>
          <option value="7200000">2 horas</option>
          <option value="10800000">3 horas</option>
          <option value="14400000">4 horas</option>
        </select>
      </div>

      <div className={message ? 'content-input-message' : ''}>
        <span>{message}</span>
      </div>
    </>
  );
}
