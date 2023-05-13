import '../styles/lead.scss';

interface LeadProps {
  title: string;
  total: number;
}

export function Lead(props: LeadProps) {
  return (
    <div className="card-lead">
      <p>{props.title}</p>
      <h3>{props.total}</h3>
    </div>
  );
}
