import '../styles/lead.scss';

interface LeadProps {
  title: string;
  total: number;
}

export function Lead(props: LeadProps) {
  return (
    <div className="card-lead">
      <h3>{props.total}</h3>
      <p>{props.title}</p>
    </div>
  );
}
