import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import '../styles/input-password.scss';

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
  isNotRequired?: boolean;
}

export function InputPassword({ message, isNotRequired, ...props }: InputPasswordProps) {
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
    <>
      <div className="input-content" style={{ marginBottom: message ? '0px' : '20px' }}>
        <input className="input-password" {...props} type={passwordType} />
        <span onClick={handleToogle}>{passwordIcon}</span>
      </div>

      <div className={message ? 'content-input-message' : ''} style={{ display: isNotRequired ? 'block' : 'none' }}>
        <span>{message}</span>
      </div>
    </>
  );
}
