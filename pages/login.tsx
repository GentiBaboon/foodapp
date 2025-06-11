import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) {
      router.push("/dashboard");
      return;
    }

    const handleCredentialResponse = (response: any) => {
      const profile = parseJwt(response.credential);
      if (profile && profile.email) {
        localStorage.setItem("username", profile.email);
        router.push("/dashboard");
      }
    };

    const parseJwt = (token: string) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch {
        return null;
      }
    };

    const initializeGSI = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID",
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin"),
          { theme: "outline", size: "large" }
        );
      }
    };

    const loadGoogle = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGSI;
      document.body.appendChild(script);
    };

    loadGoogle();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to atWork Tracker</h1>
        <div id="google-signin" className="flex justify-center"></div>
      </div>
    </div>
  );
}
