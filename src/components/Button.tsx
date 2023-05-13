import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export function Button({ title, ...props }: buttonProps) {
  return <button {...props}>{title}</button>;
}
