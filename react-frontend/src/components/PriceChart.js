import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart({ productId }) {
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${productId}/price-history/`);
        setPriceHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load price history data');
        setLoading(false);
        console.error('Error fetching price history:', err);
      }
    };

    fetchPriceHistory();
  }, [productId]);

  if (loading) return <div className="text-center py-4">Loading price history...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (priceHistory.length === 0) return <div className="text-center py-4">No price history available</div>;

  // Process data for chart
  const dates = priceHistory.map(item => new Date(item.date).toLocaleDateString());
  const prices = priceHistory.map(item => item.price);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Price History',
        data: prices,
        fill: false,
        backgroundColor: '#1c7ed6',
        borderColor: '#4da8ff',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price History Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Price History</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PriceChart;