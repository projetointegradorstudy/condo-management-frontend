import { Warning } from 'phosphor-react';
import '../styles/warning-feedback.scss';

export function WarningFeedback() {
  return (
    <div className="content-warning">
      <Warning />
      <span>NÃO POSSUI REGISTROS</span>
    </div>
  );
}
