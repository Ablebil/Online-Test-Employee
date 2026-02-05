import { useState, useEffect } from "react";
import { getCurrentTime, getGreeting } from "@/utils/date";

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
      setGreeting(getGreeting());
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return { currentTime, greeting };
};
