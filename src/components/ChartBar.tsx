import { Bar } from 'react-chartjs-2';
import { Chart as Chartjs, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { getCountReservationsByStatus } from '../services/api';
import { ReservationStatus } from '../interfaces';
import '../styles/chart-bar.scss';
import { useEffect, useRef, useState } from 'react';

Chartjs.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export function ChartBar() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#616161',
        },
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
          color: '#616161',
        },
      },
      x: {
        grid: {
          display: true,
          color: '#616161',
        },
      },
    },
  };

  const optionsMobile = {
    ...options,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: 10,
          },
        },
      },
    },
  };
  const chartDiv = useRef<HTMLDivElement | null>(null);
  const [isChartData, setIsChartData] = useState<number[]>([0, 0, 0, 0]);
  const [chartOptions, setChartOptions] = useState<any>(options);
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

  useEffect(() => {
    const handleResize = () => {
      if (chartDiv.current) {
        window.innerWidth < 680 ? setChartOptions(optionsMobile) : setChartOptions(options);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chartDiv]);

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
    <div className="chart-content-bar">
      <div className="title-chart">
        <h1>Reservas</h1>
      </div>

      <div className="chart-bar" ref={chartDiv}>
        <Bar data={data} options={chartOptions} />
      </div>
    </div>
  );
}
