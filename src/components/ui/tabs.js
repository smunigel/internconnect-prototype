import React, { createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ children, value, onValueChange, className }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { value: active, onValueChange } = useContext(TabsContext);
  const isActive = value === active;
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 rounded-md font-medium transition ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { value: active } = useContext(TabsContext);
  return active === value ? <div className="mt-4">{children}</div> : null;
}
