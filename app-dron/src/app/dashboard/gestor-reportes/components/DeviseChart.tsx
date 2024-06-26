"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  c: string[] | number[];
  v: string[] | number[];
  title: string;
  label1: string;
  label2: string;
  labelsDevise: string[];
  height: number;
}

const DeviseChart = ({ c, v, title, label1, label2, labelsDevise, height}: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = labelsDevise;
  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: c,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: label2,
        data: v,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} height={height} />;
};

export default DeviseChart;
