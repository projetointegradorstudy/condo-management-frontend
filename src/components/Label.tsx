import { LabelHTMLAttributes } from 'react';
import '../styles/label.scss';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title?: string;
  isUploadFile?: boolean;
  isEditAvatar?: boolean;
  icon?: React.ReactNode;
}

export function Label({ title, isUploadFile, isEditAvatar, icon, ...props }: LabelProps) {
  return (
    <label {...props} className={`default ${isUploadFile ? 'isUploadFile' : ''} ${isEditAvatar ? 'edit-avatar' : ''}`}>
      {title} {icon}
    </label>
  );
}
