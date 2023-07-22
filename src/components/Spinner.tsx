import spinnerImg from '../assets/loading-gif.gif';
import '../styles/spinner.scss';

export function Spinner() {
  return (
    <>
      <div className="spinnerContent">
        <img className="spinnerGif" src={spinnerImg} alt="GIF loading" />
      </div>
    </>
  );
}
