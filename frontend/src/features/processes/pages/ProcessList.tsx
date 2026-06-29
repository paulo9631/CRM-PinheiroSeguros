import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Plus, Search, MoreVertical, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { api } from '../../../services/api';
import { ProcessModal } from '../components/ProcessModal';

export function ProcessList() {
  const [processes, setProcesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProcesses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/processes');
      setProcesses(response.data);
    } catch (error) {
      console.error('Erro ao buscar processos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'TRIAGEM': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Triagem</span>;
      case 'ANALISE_DOCUMENTOS': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Análise de Docs</span>;
      case 'PERICIA': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Perícia</span>;
      case 'AGUARDANDO_RESPOSTA': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Aguardando Resposta</span>;
      case 'CONCLUIDO': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Concluído</span>;
      case 'CANCELADO': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Cancelado</span>;
      default: return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Acompanhamento de Processos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie aposentadorias, seguros e benefícios de todos os clientes.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Novo Processo
          </Button>
        </div>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-[#0D0D0D]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
              placeholder="Buscar por cliente ou serviço..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-[#0D0D0D]/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cliente</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Serviço</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoria</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-card-dark divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Carregando processos...
                  </td>
                </tr>
              ) : processes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Nenhum processo cadastrado ainda.
                  </td>
                </tr>
              ) : (
                processes.map((proc) => (
                  <tr key={proc.id} className="table-row-hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{proc.client.full_name}</div>
                      </div>
                      <div className="text-xs text-gray-500">{proc.client.cpf}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{proc.service_type}</div>
                      {proc.description && <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{proc.description}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{proc.category === 'PREVIDENCIARIO' ? 'INSS' : 'Seguro'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(proc.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-secondary dark:text-secondary-dark mr-2">
                        <FileText className="w-4 h-4 mr-1" /> Ver Caso
                      </Button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProcessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchProcesses} 
      />
    </div>
  );
}
