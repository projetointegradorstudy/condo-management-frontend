import { Doughnut } from 'react-chartjs-2';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/chart-doughnut.scss';

Chartjs.register(ArcElement, Tooltip, Legend);

interface IData {
  usersQty: number;
  environmentsQty: number;
}

export function ChartDoughnut({ usersQty, environmentsQty }: IData) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#616161',
        },
      },
    },
  };

  const data = {
    labels: ['Usuários', 'Ambientes'],
    datasets: [
      {
        id: 1,
        data: [usersQty, environmentsQty],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
        hoverOffset: 4,
        borderColor: 'transparent',
      },
    ],
  };

  return (
    <div className="chart-content-doughnut">
      <div className="title-chart">
        <h1>Cadastros</h1>
      </div>

      <div className="chart-doughnut">
        <Doughnut data={data} datasetIdKey="id" options={options} className="dough" />
      </div>
    </div>
  );
}
