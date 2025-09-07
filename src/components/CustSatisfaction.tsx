"use client"
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SatisfactionData {
  currmonthName: string;
  month: string;
  totalRevenue: number;
  prevMonthName: string;
}

const CustSatisfaction: React.FC = () => {
  const [data, setData] = useState<SatisfactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard/customer-satisfaction');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  // Transform API data for Chart.js
  const currentMonth = data[0];
  const previousMonth = data[1];

  // Generate sample data points for visualization (you can adjust this based on your needs)
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
  
  const chartData = {
    labels,
    datasets: [
      {
        label: previousMonth?.prevMonthName || 'Last Month',
        data: [85, 75, 78, 82, 88], // Sample data - replace with actual data
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#3B82F6',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: currentMonth?.currmonthName || 'This Month',
        data: [90, 85, 95, 88, 92], // Sample data - replace with actual data
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#10B981',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#6B7280',
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        min: 60,
        max: 100,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border w-fit min-w-2xl ">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Customer Satisfaction
        </h2>
      </div>
      
      <div className="h-64 mb-4">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="flex justify-center space-x-8 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">{previousMonth?.prevMonthName || 'Last Month'}</span>
          <span className="text-gray-700 font-semibold">${previousMonth?.totalRevenue?.toLocaleString() || '3,004'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">{currentMonth?.currmonthName || 'This Month'}</span>
          <span className="text-gray-700 font-semibold">${currentMonth?.totalRevenue?.toLocaleString() || '4,504'}</span>
        </div>
      </div>
    </div>
  );
};

export default CustSatisfaction;
