
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProgressGraphs() {
  const [progress, setProgress] = useState({ sugar: 0, carbs: 0, alcohol: 0 });
  const [targets, setTargets] = useState({ sugar: 20, carbs: 20, alcohol: 15 });

  useEffect(() => {
    const savedProgress = localStorage.getItem("foodProgress");
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    const savedTargets = localStorage.getItem("targetSettings");
    if (savedTargets) setTargets(JSON.parse(savedTargets));
  }, []);

  const data = {
    labels: ["Sugar", "Carbs", "Alcohol"],
    datasets: [
      {
        label: "Progress",
        data: [progress.sugar, progress.carbs, progress.alcohol],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Target",
        data: [targets.sugar, targets.carbs, targets.alcohol],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Progress vs. Targets" },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>
      <div className="max-w-2xl mx-auto">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
