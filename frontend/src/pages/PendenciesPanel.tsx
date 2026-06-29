import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Filter, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export function PendenciesPanel() {
  const pendencies = [
    {
      id: 1,
      client: 'João da Silva',
      processType: 'Auxílio-Doença (INSS)',
      description: 'Falta laudo médico atualizado (últimos 3 meses)',
      status: 'pendencia' as const,
      date: '28/06/2026',
    },
    {
      id: 2,
      client: 'Maria Oliveira',
      processType: 'Seguro de Vida',
      description: 'Aguardando assinatura da apólice',
      status: 'em-andamento' as const,
      date: '27/06/2026',
    },
    {
      id: 3,
      client: 'Carlos Eduardo',
      processType: 'Aposentadoria',
      description: 'Enviar cópia do PPP assinada pela empresa',
      status: 'pendencia' as const,
      date: '29/06/2026',
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-status-warning-text" />
            Painel de Pendências
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie e resolva os gargalos dos processos ativos.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" icon={Filter}>
            Filtrar
          </Button>
          <Button variant="primary" icon={Plus}>
            Nova Pendência
          </Button>
        </div>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-[#0D0D0D]/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente / Processo
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Descrição do Gargalo
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-card-dark divide-y divide-gray-200 dark:divide-gray-700">
              {pendencies.map((pendency) => (
                <tr key={pendency.id} className="table-row-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {pendency.client}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {pendency.processType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-200">{pendency.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{pendency.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={pendency.status}>
                      {pendency.status === 'pendencia' ? 'Pendente' : 'Em Andamento'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-secondary dark:text-secondary-dark mr-2">
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="text-status-success-text border-status-success-bg hover:bg-status-success-bg">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Resolver
                    </Button>
                  </td>
                </tr>
              ))}
              
              {/* Exemplo de Pendência Resolvida para demonstração de badge */}
              <tr className="table-row-hover opacity-75">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Ana Santos</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Aposentadoria</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">Entregar cópia do RG autenticada</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">25/06/2026</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status="concluido">Resolvida</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm text-gray-400">Finalizada</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="bg-white dark:bg-card-dark px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between sm:px-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">4</span> de <span className="font-medium">12</span> resultados
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm">Próximo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
