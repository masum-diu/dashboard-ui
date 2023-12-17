import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    if (data) {
      const ctx = document.getElementById("pieChart").getContext("2d");

      if (chartRef.current !== null) {
        chartRef.current.destroy(); // Destroy existing chart if it exists
      }

      const newChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Pie Chart",
              data: data.values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                // Add more colors as needed
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Pie Chart",
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
          onClick: (event, segments) => {
            if (segments && segments.length > 0) {
              const segment = segments[0];
              setSelectedSegment(segment.index);
            } else {
              setSelectedSegment(null);
            }
          },
        },
      });

      chartRef.current = newChart; // Store reference to the new chart
    }
  }, [data]);

  return (
    <div style={{ height: "400px" }}>
      <canvas id="pieChart" style={{ cursor: "pointer" }}></canvas>
      {selectedSegment !== null && (
        <p>Selected Segment: {data.labels[selectedSegment]}</p>
      )}
    </div>
  );
};

export default PieChart;
