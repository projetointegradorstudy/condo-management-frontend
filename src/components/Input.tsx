import { InputHTMLAttributes } from 'react';
import '../styles/input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export function Input({ title }: InputProps) {
  return (
    <>
      <label>{title}</label>
      <input />
    </>
  );
}
