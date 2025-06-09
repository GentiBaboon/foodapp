
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) router.push("/dashboard");
  }, [router]);

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      router.push("/dashboard");
    } else {
      alert("Please enter your name to continue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome to atWork Tracker</h1>
        <label className="block mb-2">Enter your name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
