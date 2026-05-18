"use client"

import * as React from "react"
import { useState, useEffect, createContext, useContext } from 'react';
import {
  Clock,
  Settings,
  Sun,
  Moon,
  Camera,
  Zap,
  Monitor,
  Flashlight as FlashlightIcon,
  Maximize2,
} from "lucide-react";

// ==========================================
// 1. 手動融合 Button 元件，避免系統找不到檔案
// ==========================================
function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 py-2 px-4 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 ${className}`}
      {...props}
    />
  )
}

// ==========================================
// 2. 手動融合 Tabs 元件，避免系統找不到檔案
// ==========================================
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

// ==========================================
// 3. 呼叫你自己建立的另外三個功能組件
// ==========================================
import { ClockContainer } from '@/components/ClockContainer';
import { MirrorContainer } from '@/components/MirrorContainer';
import { FlashlightContainer } from '@/components/FlashlightContainer';

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
    <main className="relative flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden">
      {/* 導覽列 */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-center pointer-events-none">
        <div className="bg-card/80 backdrop-blur-md border border-border px-1.5 py-1.5 rounded-full shadow-lg pointer-events-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-transparent h-10 gap-1">
              <TabsTrigger value="clock" className="rounded-full px-6">
                <Clock className="w-4 h-4 mr-2" /> Time
              </TabsTrigger>
              <TabsTrigger value="mirror" className="rounded-full px-6">
                <Camera className="w-4 h-4 mr-2" /> Mirror
              </TabsTrigger>
              <TabsTrigger value="flashlight" className="rounded-full px-6">
                <FlashlightIcon className="w-4 h-4 mr-2" /> Light
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 主畫面內容 */}
      <div className="flex-1 relative h-full w-full">
        <Tabs value={activeTab} className="h-full w-full">
          <TabsContent value="clock" className="h-full w-full m-0 data-[state=active]:flex items-center justify-center">
            <ClockContainer />
          </TabsContent>
          <TabsContent value="mirror" className="h-full w-full m-0 data-[state=active]:flex items-center justify-center">
            <MirrorContainer active={activeTab === "mirror"} />
          </TabsContent>
          <TabsContent value="flashlight" className="h-full w-full m-0 data-[state=active]:flex items-center justify-center">
            <FlashlightContainer />
          </TabsContent>
        </Tabs>
      </div>

      {/* 深淺色切換按鈕 */}
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