"use client"
import { useState, useEffect } from 'react';
export function ClockContainer() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="text-4xl font-bold font-mono text-primary">{time || "讀取中..."}</div>;
}