import React from 'react';
import { Home, Users, FileText, AlertCircle, BarChart2 } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Users, label: 'Meus Clientes', path: '/clientes' },
    { icon: FileText, label: 'Processos', path: '/processos' },
    { icon: AlertCircle, label: 'Pendências', path: '/pendencias' },
    { icon: BarChart2, label: 'Relatórios', path: '/relatorios' },
  ];

  return (
    <aside className="w-64 bg-[#0D0D0D] text-gray-300 min-h-screen flex flex-col hidden md:flex fixed h-full z-10 border-r border-gray-800">
      <div className="p-6 flex justify-center items-center">
        <img src="/logo.png" alt="Pinheiro Seguros" className="h-10 w-auto" />
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = location.pathname === item.path || (location.pathname === '/' && item.path === '/pendencias'); // Temporary active logic
            return (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    active 
                      ? 'bg-[#220540] text-white font-medium' 
                      : 'hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${active ? 'text-secondary' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800 text-sm text-gray-500">
        &copy; 2026 Pinheiro Seguros
      </div>
    </aside>
  );
}
