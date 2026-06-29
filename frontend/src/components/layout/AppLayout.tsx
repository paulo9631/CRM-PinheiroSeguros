import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      
      {/* Main Content - Pushed to the right by sidebar width (64 * 4px = 256px) on desktop */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
