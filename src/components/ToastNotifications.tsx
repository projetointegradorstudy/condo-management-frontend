import { ToastContainer, toast } from 'react-toastify';
import { IToastNotification } from '../interfaces';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toast.scss';

export function ToastMessage({ message, type }: IToastNotification) {
  toast[type](message, { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
}

export function ToastNotifications() {
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
