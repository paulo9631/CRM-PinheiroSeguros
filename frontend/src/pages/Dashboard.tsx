import React from 'react';
import { Users, FileText, AlertCircle, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { title: 'Total de Clientes', value: '0', icon: Users, color: 'bg-blue-500' },
    { title: 'Processos Ativos', value: '0', icon: FileText, color: 'bg-green-500' },
    { title: 'Pendências', value: '0', icon: AlertCircle, color: 'bg-yellow-500' },
    { title: 'Processos Concluídos', value: '0', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Início</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Visão geral do seu CRM.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-lg text-white ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Atividade Recente</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Os dados reais serão carregados aqui em breve.</p>
      </div>
    </div>
  );
}
