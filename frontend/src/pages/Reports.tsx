import React from 'react';
import { BarChart2, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Reports() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart2 className="w-6 h-6 mr-2 text-primary" />
            Relatórios
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gere relatórios gerenciais sobre clientes e processos.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="outline" icon={Download}>
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-12">
          <BarChart2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Módulo de Relatórios em Desenvolvimento</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Em breve você poderá visualizar gráficos de conversão, tempo médio de processo e produtividade da equipe.
          </p>
        </div>
      </div>
    </div>
  );
}
