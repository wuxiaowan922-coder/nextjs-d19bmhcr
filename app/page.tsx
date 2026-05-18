'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ClockContainer } from '@/components/ClockContainer';
import { MirrorContainer } from '@/components/MirrorContainer';
import { FlashlightContainer } from '@/components/FlashlightContainer';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('clock');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Sync with system preference initially
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
            {/* Feature Navigation Header */}     {' '}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-center pointer-events-none">
               {' '}
        <div className="bg-card/80 backdrop-blur-md border border-border px-1.5 py-1.5 rounded-full shadow-lg pointer-events-auto">
                   {' '}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-auto"
          >
                       {' '}
            <TabsList className="bg-transparent h-10 gap-1">
                           {' '}
              <TabsTrigger
                value="clock"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
              >
                                <Clock className="w-4 h-4 mr-2" />             
                  Time              {' '}
              </TabsTrigger>
                           {' '}
              <TabsTrigger
                value="mirror"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
              >
                                <Camera className="w-4 h-4 mr-2" />             
                  Mirror              {' '}
              </TabsTrigger>
                           {' '}
              <TabsTrigger
                value="flashlight"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
              >
                                <FlashlightIcon className="w-4 h-4 mr-2" />     
                          Light              {' '}
              </TabsTrigger>
                         {' '}
            </TabsList>
                     {' '}
          </Tabs>
                 {' '}
        </div>
             {' '}
      </div>
            {/* Main Content Area */}     {' '}
      <div className="flex-1 relative">
               {' '}
        <Tabs value={activeTab} className="h-full">
                   {' '}
          <TabsContent
            value="clock"
            className="h-full m-0 data-[state=active]:flex items-center justify-center"
          >
                        <ClockContainer />         {' '}
          </TabsContent>
                   {' '}
          <TabsContent
            value="mirror"
            className="h-full m-0 data-[state=active]:flex items-center justify-center"
          >
                        <MirrorContainer active={activeTab === 'mirror'} />     
               {' '}
          </TabsContent>
                   {' '}
          <TabsContent
            value="flashlight"
            className="h-full m-0 data-[state=active]:flex items-center justify-center"
          >
                        <FlashlightContainer />         {' '}
          </TabsContent>
                 {' '}
        </Tabs>
             {' '}
      </div>
           {' '}
      {/* Global Utilities (Bottom Left: Theme, Bottom Right: Appears in feature containers usually, but keeping layout consistent) */}
           {' '}
      <div className="absolute bottom-6 left-6 z-30">
               {' '}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-full w-12 h-12 shadow-md hover:scale-105 transition-transform"
        >
                   {' '}
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
                 {' '}
        </Button>
             {' '}
      </div>
         {' '}
    </main>
  );
}
