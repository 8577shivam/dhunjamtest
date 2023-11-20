import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({
  customSongAmount,
  category7Amount,
  category8Amount,
  category9Amount,
  category10Amount,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const createBarChart = () => {
      const chartData = {
        labels: [
          "Custom Song",
          "Category 7",
          "Category 8",
          "Category 9",
          "Category 10",
        ],
        datasets: [
          {
            label: "Song Amounts",
            data: [
              customSongAmount || 0,
              category7Amount || 0,
              category8Amount || 0,
              category9Amount || 0,
              category10Amount || 0,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      if (chartRef.current) {
        console.log(chartRef.current);
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(chartRef.current, chartConfig);
      }
    };

    createBarChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [
    customSongAmount,
    category7Amount,
    category8Amount,
    category9Amount,
    category10Amount,
  ]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
