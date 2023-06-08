import { Warning } from 'phosphor-react';
import '../styles/warning-feedback.scss';

type WarningFeedbackProps = {
  title: string;
};

export function WarningFeedback({ title }: WarningFeedbackProps) {
  return (
    <div className="content-warning">
      <Warning />
      <span>{title}</span>
    </div>
  );
}
