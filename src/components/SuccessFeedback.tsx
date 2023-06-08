import { CheckCircle } from 'phosphor-react';
import '../styles/success-feedback.scss';

type SuccessFeedbackProps = {
  title: string;
};

export function SuccessFeedback({ title }: SuccessFeedbackProps) {
  return (
    <div className="content-success">
      <CheckCircle />
      <span>{title}</span>
    </div>
  );
}
