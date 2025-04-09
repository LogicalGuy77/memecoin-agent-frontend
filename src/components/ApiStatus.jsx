import { useState, useEffect } from "react";
import axios from "axios";

function ApiStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        setStatus("checking");
        await axios.get("/");
        setStatus("connected");
      } catch (err) {
        console.error("API Status Check Failed:", err);
        setStatus("disconnected");
      }
    };

    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`h-2 w-2 rounded-full ${getStatusColor()}`}></span>
      <span className="text-xs text-zinc-400">
        API{" "}
        {status === "checking"
          ? "Checking..."
          : status === "connected"
          ? "Connected"
          : "Disconnected"}
      </span>
    </div>
  );
}

export default ApiStatus;
