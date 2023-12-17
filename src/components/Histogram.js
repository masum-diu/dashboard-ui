import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Histogram = ({ initialData }) => {
  const [chartData, setChartData] = useState(initialData);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      chartRef.current.destroy(); // Destroy existing chart if it exists
    }

    const ctx = document.getElementById("histogramChart").getContext("2d");

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels.map(
          (bin) => `${bin.x} - ${bin.x + initialData.binSize}`
        ),
        datasets: [
          {
            label: "Histogram",
            data: chartData.values,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Histogram Chart",
            font: {
              size: 20,
            },
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Bins",
            },
          },
          y: {
            title: {
              display: true,
              text: "Frequency",
            },
            beginAtZero: true,
          },
        },
        onClick: (event, chartElements) => {
          if (chartElements.length > 0) {
            const clickedIndex = chartElements[0].index;
            const newData = {
              labels: chartData.labels.filter((_, idx) => idx !== clickedIndex),
              values: chartData.values.filter((_, idx) => idx !== clickedIndex),
            };
            setChartData(newData);
          }
        },
      },
    });

    chartRef.current = newChart; // Store reference to the new chart
  }, [chartData, initialData]);

  return (
    <div style={{ height: "400px" }}>
      <canvas style={{ cursor: "pointer" }} id="histogramChart"></canvas>
    </div>
  );
};

export default Histogram;
