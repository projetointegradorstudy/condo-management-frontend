import { LabelHTMLAttributes } from 'react';
import '../styles/label.scss';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title?: string;
  isUploadFile?: boolean;
  icon?: React.ReactNode;
}

export function Label({ title, isUploadFile, icon, ...props }: LabelProps) {
  return (
    <label {...props} className={`label ${isUploadFile ? 'isUploadFile' : ''}`}>
      {title} {icon}
    </label>
  );
}
