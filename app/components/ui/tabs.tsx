"use client"
import * as React from "react"

const TabsContext = React.createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} })

export function Tabs({ value, onValueChange, children, className }: any) {
  return <TabsContext.Provider value={{ value, onValueChange }}><div className={className}>{children}</div></TabsContext.Provider>
}
export function TabsList({ children, className }: any) {
  return <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>{children}</div>
}
export function TabsTrigger({ value, children, className }: any) {
  const { value: activeValue, onValueChange } = React.useContext(TabsContext)
  const isActive = activeValue === value
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${isActive ? "bg-background text-foreground shadow-sm" : ""} ${className}`}
    >
      {children}
    </button>
  )
}
export function TabsContent({ value, children, className }: any) {
  const { value: activeValue } = React.useContext(TabsContext)
  if (activeValue !== value) return null
  return <div className={className}>{children}</div>
}