import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white dark:bg-[#024873] border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10 glass">
      
      <div className="flex items-center flex-1">
        {/* Mobile menu button */}
        <button className="md:hidden mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
            placeholder="Pesquisar cliente por CPF/Nome..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-status-warning-bg border-2 border-white dark:border-[#024873]"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-medium shadow-sm">
            VP
          </div>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Valcélio Pinheiro</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Corretor</p>
          </div>
        </div>
      </div>
    </header>
  );
}
