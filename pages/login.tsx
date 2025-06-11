
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    FB: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const initFacebook = () => {
    if (window.FB) {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) router.push("/dashboard");

    if (!(window as any).FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.onload = initFacebook;
      document.body.appendChild(script);
    } else {
      initFacebook();
    }
  }, [router]);

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      router.push("/dashboard");
    } else {
      alert("Please enter your name to continue");
    }
  };

  const handleFacebookLogin = () => {
    if (!window.FB) return;
    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          window.FB.api(
            "/me",
            { fields: "name" },
            (info: any) => {
              if (info && info.name) {
                localStorage.setItem("username", info.name);
                router.push("/dashboard");
              }
            }
          );
        }
      },
      { scope: "public_profile,email" }
    );
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
        <button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-800 text-white p-2 rounded mt-4"
        >
          Login with Facebook
        </button>
      </div>
    </div>
  );
}
