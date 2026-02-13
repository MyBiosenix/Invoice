import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from "chart.js";
import 'chartjs-adapter-date-fns';
import { InvoiceContext } from '@/Context/InvoiceContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title
);

const DailySalesGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const { token, backendUrl, role } = useContext(InvoiceContext);

const fetchSales = async (type = 'Day') => {
  try {
    const url = role === 'admin'
      ? `${backendUrl}/multisales/${type}`
      : `${backendUrl}/sales/${type}`;

    const response = await axios.get(url, { headers: { token } });
    const rawData = response.data.data;

    const formattedData = rawData.map(item => {
      let parsedDate;

      // DAY (string like "2026-02-12")
      if (typeof item._id === "string") {
        parsedDate = new Date(item._id);
      }

      // WEEK ( { year, week } )
      else if (item._id.week) {
        const firstDayOfYear = new Date(item._id.year, 0, 1);
        const daysOffset = (item._id.week - 1) * 7;
        parsedDate = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
      }

      // MONTH ( { year, month } )
      else if (item._id.month) {
        parsedDate = new Date(item._id.year, item._id.month - 1, 1);
      }

      // QUARTER ( { year, quarter } )
      else if (item._id.quarter) {
        const month = (item._id.quarter - 1) * 3;
        parsedDate = new Date(item._id.year, month, 1);
      }

      // YEAR ( { year } )
      else if (item._id.year) {
        parsedDate = new Date(item._id.year, 0, 1);
      }

      return {
        date: parsedDate,
        totalAmount: item.totalSales
      };
    })
    .sort((a, b) => a.date - b.date);

    setGraphData(formattedData);

  } catch (e) {
    console.error("Error fetching sales:", e.message);
  }
};


  useEffect(() => {
    fetchSales();
  }, []);

  // Colors for points based on increase/decrease
  const pointColors = graphData.map((day, i) => {
    if (i === 0) return "rgba(54, 162, 235, 0.7)";
    return day.totalAmount >= graphData[i - 1].totalAmount
      ? "rgba(0, 200, 0, 0.7)" // up
      : "rgba(255, 0, 0, 0.7)"; // down
  });

  const data = {
    labels: graphData.map(item => item.date),
    datasets: [
      {
        label: "Sales (₹)",
        data: graphData.map(item => item.totalAmount),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: pointColors,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sales Up/Down', font: { size: 20 } },
      tooltip: {
        callbacks: {
          label: function(context) {
            const date = context.label instanceof Date
              ? context.label.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : context.label;
            const sales = context.raw.toLocaleString();
            const prev = context.dataIndex === 0 ? context.raw : graphData[context.dataIndex - 1].totalAmount;
            const arrow = context.raw >= prev ? " ↑" : " ↓";
            return `${date}: ₹${sales}${context.dataIndex === 0 ? '' : arrow}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'MMM dd, yyyy', displayFormats: { day: 'MMM dd' } },
        title: { display: true, text: 'Date' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Sales (₹)' },
        ticks: { callback: value => `₹${value.toLocaleString()}` }
      }
    }
  };

  return (
    <div className="w-full">
      {/* Buttons for Day, Week, Month, Year */}
      <div className='w-full px-6 gap-5 noto-serif flex flex-row text-xs font-bold items-center justify-center mb-4'>
        {['Day', 'Week', 'Month', 'Year'].map(t => (
          <div
            key={t}
            onClick={() => fetchSales(t)}
            className='flex items-center justify-center w-12 h-12 bg-slate-50 rounded-full hover:text-blue-400 shadow-lg cursor-pointer'
          >
            {t}
          </div>
        ))}
      </div>

      {/* Graph */}
      <div className='flex w-full  sm:h-[70vh]'>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DailySalesGraph;
