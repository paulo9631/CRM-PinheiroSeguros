import React from 'react';
import { Home, Users, FileText, AlertCircle, BarChart2, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Users, label: 'Meus Clientes', path: '/clientes' },
    { icon: FileText, label: 'Processos', path: '/processos' },
    { icon: AlertCircle, label: 'Pendências', path: '/pendencias' },
    { icon: BarChart2, label: 'Relatórios', path: '/relatorios' },
  ];

  if (user?.role === 'ADMIN') {
    menuItems.push({ icon: Shield, label: 'Equipe', path: '/equipe' });
  }

  return (
    <aside className="w-64 bg-white dark:bg-[#0D0D0D] text-gray-700 dark:text-gray-300 min-h-screen flex flex-col hidden md:flex fixed h-full z-10 border-r border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="p-6 flex justify-center items-center border-b border-gray-100 dark:border-gray-800">
        <img src="/logo.png" alt="Pinheiro Seguros" className="h-12 w-auto object-contain" />
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    active 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 shadow-sm' 
                      : 'hover:bg-gray-50 text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${active ? 'text-primary dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800">
        <div className="bg-primary/5 dark:bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Suporte Técnico</p>
          <p className="text-xs font-semibold text-primary dark:text-blue-400">(88) 99974-3315</p>
        </div>
      </div>
    </aside>
  );
}
