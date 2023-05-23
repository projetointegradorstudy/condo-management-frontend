import { LabelHTMLAttributes } from 'react';
import '../styles/label.scss';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
  isUploadFile?: boolean;
}

export function Label({ title, isUploadFile, ...props }: LabelProps) {
  return (
    <label {...props} className={`input ${isUploadFile ? 'isUploadFile' : ''}`}>
      {title}
    </label>
  );
}
