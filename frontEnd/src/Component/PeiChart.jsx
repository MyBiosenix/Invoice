import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { InvoiceContext } from "@/Context/InvoiceContext";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PeiChart = () => {
  const [companySales, setCompanySales] = useState([]);
  const { backendUrl, token } = useContext(InvoiceContext);

  useEffect(() => {
    const fetchCompanySales = async () => {
      try {
        const response = await axios.get(`${backendUrl}/SALESTP`, {
          headers: { token },
        });
        setCompanySales(response.data.data); // [{companyName, totalSales, percentage}]
      } catch (err) {
        console.error("Error fetching company sales:", err.message);
      }
    };

    fetchCompanySales();
  }, [backendUrl, token]);

  const chartData = {
    labels: companySales.map((c) => c.companyName),
    datasets: [
      {
        label: "Sales %",
        data: companySales.map((c) => c.percentage),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const company = companySales[index];
            return `${company.companyName}: ${company.totalSales} (${company.percentage.toFixed(
              2
            )}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value) => `${value.toFixed(2)}%`, // show percentage on slice
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Company Sales Distribution</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PeiChart;
