import { Bar } from 'react-chartjs-2';
import { Chart as Chartjs, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { getCountReservationsByStatus } from '../services/api';
import { ReservationStatus } from '../interfaces';
import '../styles/chart-line.scss';
import { useEffect, useState } from 'react';

Chartjs.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export function ChartBar() {
  const [isChartData, setIsChartData] = useState<number[]>([0, 0, 0, 0]);
  const getChartData = async (): Promise<void> => {
    const envReservationsApprovedQty =
      +(await getCountReservationsByStatus(ReservationStatus.APPROVED).then((res) => res.data)) || 0;
    const envReservationsPendingQty =
      +(await getCountReservationsByStatus(ReservationStatus.PENDING).then((res) => res.data)) || 0;
    const envReservationsCancelledQty =
      +(await getCountReservationsByStatus(ReservationStatus.CANCELLED).then((res) => res.data)) || 0;
    const envReservationsNotApprovedQty =
      +(await getCountReservationsByStatus(ReservationStatus.NOT_APPROVED).then((res) => res.data)) || 0;

    setIsChartData([
      envReservationsApprovedQty,
      envReservationsPendingQty,
      envReservationsCancelledQty,
      envReservationsNotApprovedQty,
    ]);
  };

  useEffect(() => {
    getChartData();
  }, []);

  const options = {
    // responsive: true,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: true,
        labels: {
          color: '#616161',
        },
      },
    },
  };

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Aprovadas',
        data: [isChartData[0]],
        backgroundColor: ['#38ba7c'],
      },
      {
        label: 'Pendentes',
        data: [isChartData[1]],
        backgroundColor: ['#ffc107'],
      },
      {
        label: 'Canceladas',
        data: [isChartData[2]],
        backgroundColor: ['#f34542'],
      },
      {
        label: 'Não Aprovadas',
        data: [isChartData[3]],
        backgroundColor: ['#e02f2c'],
      },
    ],
  };

  return (
    <div className="chart-content-line">
      <h1>Reservas</h1>

      <Bar data={data} options={options} />
    </div>
  );
}
