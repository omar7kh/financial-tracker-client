import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

const BarChart = ({ rawData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const formatChartData = (data) => {
    const groupedData = data.reduce((acc, current) => {
      const date = new Date(current.date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      if (!acc[date]) {
        acc[date] = { transfer: 0, income: 0, expense: 0, others: 0 };
      }
      acc[date][current.category] += current.amount;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const transferData = labels.map((date) => groupedData[date].transfer);
    const incomeData = labels.map((date) => groupedData[date].income);
    const expenseData = labels.map((date) => groupedData[date].expense);
    const othersData = labels.map((date) => groupedData[date].others);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Transfer',
          data: transferData,
          backgroundColor: '#ff8c1a',
          borderRadius: 5,
        },
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: '#00b359',
          borderRadius: 5,
        },
        {
          label: 'Expense',
          data: expenseData,
          backgroundColor: '#e60000',
          borderRadius: 5,
        },
        {
          label: 'Others',
          data: othersData,
          backgroundColor: '#111111',
          borderRadius: 5,
        },
      ],
    };
  };

  const [userData, setUserData] = useState(formatChartData(rawData));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='border rounded-md shadow-md dark:bg-gray-200 w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]'>
      <Bar options={options} data={userData} />
    </div>
  );
};

export default BarChart;
