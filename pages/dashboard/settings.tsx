
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TargetSettings() {
  const router = useRouter();
  const [targets, setTargets] = useState({ sugar: 20, carbs: 20, alcohol: 15 });

  useEffect(() => {
    const saved = localStorage.getItem("targetSettings");
    if (saved) setTargets(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTargets((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const saveTargets = () => {
    localStorage.setItem("targetSettings", JSON.stringify(targets));
    alert("Targets saved!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Set Monthly Targets</h1>
      <div className="space-y-4">
        {Object.keys(targets).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize">{key} exclusion target (days/month):</label>
            <input
              type="number"
              name={key}
              value={targets[key]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-32"
            />
          </div>
        ))}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={saveTargets}
        >
          Save & Back to Dashboard
        </button>
      </div>
    </div>
  );
}
