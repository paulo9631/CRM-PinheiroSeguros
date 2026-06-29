import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Filter, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { PendencyModal } from '../features/pendencies/components/PendencyModal';

export function PendenciesPanel() {
  const [pendencies, setPendencies] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const fetchPendencies = async () => {
    try {
      setLoading(true);
      const { api } = await import('../services/api');
      const response = await api.get('/pendencies');
      setPendencies(response.data);
    } catch (error) {
      console.error('Erro ao buscar pendências', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPendencies();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      const { api } = await import('../services/api');
      await api.patch(`/pendencies/${id}/resolve`);
      fetchPendencies();
    } catch (error) {
      console.error('Erro ao resolver pendência', error);
    }
  };

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
          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Carregando pendências...
                  </td>
                </tr>
              ) : pendencies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Nenhuma pendência em aberto! 🎉
                  </td>
                </tr>
              ) : pendencies.map((pendency) => (
                <tr key={pendency.id} className="table-row-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {pendency.process?.client?.full_name || 'Cliente Desconhecido'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {pendency.process?.service_type || 'Processo'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-200">{pendency.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(pendency.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status="pendencia">Pendente</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-secondary dark:text-secondary-dark mr-2">
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleResolve(pendency.id)} className="text-status-success-text border-status-success-bg hover:bg-status-success-bg">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Resolver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PendencyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchPendencies} 
      />
    </div>
  );
}
