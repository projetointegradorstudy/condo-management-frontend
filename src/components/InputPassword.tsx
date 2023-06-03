import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import '../styles/input-password.scss';

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement>;

export function InputPassword({ ...props }: InputPasswordProps) {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState(<Eye className="icons" />);

  const handleToogle = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setPasswordIcon(<Eye className="icons" />);
    } else {
      setPasswordType('password');
      setPasswordIcon(<EyeSlash className="icons" />);
    }
  };

  return (
    <div className="input-content">
      <input className="input-password" {...props} type={passwordType} />
      <span onClick={handleToogle}>{passwordIcon}</span>
    </div>
  );
}
