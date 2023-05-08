import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export function Button({ title }: buttonProps) {
  return <button>{title}</button>;
}
