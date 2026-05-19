"use client"

import * as React from "react"
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import {
  Clock as ClockIcon,
  Sun,
  Moon,
  Camera,
  Flashlight as FlashlightIcon,
} from "lucide-react";

function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 py-2 px-4 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 ${className}`}
      {...props}
    />
  )
}

const TabsContext = createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} })

function Tabs({ value, onValueChange, children, className }: any) {
  return <TabsContext.Provider value={{ value, onValueChange }}><div className={className}>{children}</div></TabsContext.Provider>
}
function TabsList({ children, className }: any) {
  return <div className={`inline-flex h-11 items-center justify-center rounded-xl bg-zinc-100 p-1 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 ${className}`}>{children}</div>
}
function TabsTrigger({ value, children, className }: any) {
  const { value: activeValue, onValueChange } = useContext(TabsContext)
  const isActive = activeValue === value
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${isActive ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-zinc-50" : ""} ${className}`}
    >
      {children}
    </button>
  )
}
function TabsContent({ value, children, className }: any) {
  const { value: activeValue } = useContext(TabsContext)
  if (activeValue !== value) return null
  return <div className={className}>{children}</div>
}

function ClockContainer() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-7xl font-bold tracking-tighter sm:text-8xl tabular-nums">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </h1>
      <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium">
        {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
}

function MirrorContainer({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (active) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(s => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => setError("無法與相機連線，請檢查權限"));
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [active]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {error ? (
        <p className="text-destructive font-medium">{error}</p>
      ) : (
        <div className="relative w-full max-w-md aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        </div>
      )}
    </div>
  );
}

function FlashlightContainer() {
  const [color, setColor] = useState("#ffffff");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 transition-colors duration-200" style={{ backgroundColor: color }}>
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-xs border border-zinc-200/50">
        <h3 className="font-semibold text-center text-zinc-800 dark:text-zinc-200">補光燈控制</h3>
        <div className="flex justify-center gap-3">
          {["#ffffff", "#fffaed", "#fcedc0", "#fca4a4"].map(c => (
            <button key={c} onClick={() => setColor(c)} className="w-8 h-8 rounded-full border border-zinc-300 shadow-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("clock");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!mounted) return null;

  return (
    <main className="relative flex flex-col h-screen w-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-center pointer-events-none">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-1.5 py-1.5 rounded-full shadow-lg pointer-events-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-transparent h-10 gap-1 border-0">
              <TabsTrigger value="clock" className="rounded-full px-6">
                <ClockIcon className="w-4 h-4 mr-2" /> 時間
              </TabsTrigger>
              <TabsTrigger value="mirror" className="rounded-full px-6">
                <Camera className="w-4 h-4 mr-2" /> 鏡子
              </TabsTrigger>
              <TabsTrigger value="flashlight" className="rounded-full px-6">
                <FlashlightIcon className="w-4 h-4 mr-2" /> 補光燈
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 relative h-full w-full">
        <Tabs value={activeTab} className="h-full w-full">
          <TabsContent value="clock" className="h-full w-full m-0 flex items-center justify-center">
            <ClockContainer />
          </TabsContent>
          <TabsContent value="mirror" className="h-full w-full m-0 flex items-center justify-center">
            <MirrorContainer active={activeTab === "mirror"} />
          </TabsContent>
          <TabsContent value="flashlight" className="h-full w-full m-0 flex items-center justify-center">
            <FlashlightContainer />
          </TabsContent>
        </Tabs>
      </div>

      <div className="absolute bottom-6 left-6 z-30">
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-full w-12 h-12 shadow-md hover:scale-105 transition-transform"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
    </main>
  );
}