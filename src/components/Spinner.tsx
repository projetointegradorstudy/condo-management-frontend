import '../styles/spinner.scss';
import spinnerImg from '../assets/loading-gif.gif';

export function Spinner() {
  return (
    <>
      <div className="spinnerContent">
        <img className="spinnerGif" src={spinnerImg} alt="GIF loading" />
      </div>
    </>
  );
}
