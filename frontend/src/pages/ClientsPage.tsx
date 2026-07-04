import React, { useState, useEffect, useRef } from 'react';
import { Users, FileSpreadsheet, Search, Plus, Trash2 } from 'lucide-react';
import Papa from 'papaparse';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { ClientModal } from '../features/clients/components/ClientModal';

interface Process {
  id: string;
  service_type: string;
  observations: string | null;
  re_registration_date: string | null;
  accident_date: string | null;
}

interface Client {
  id: string;
  cpf: string;
  full_name: string;
  gov_password: string | null;
  processes: Process[];
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o cliente ${name} e todos os seus processos?`)) return;
    
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Ocorreu um erro ao excluir o cliente.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);

    Papa.parse(file, {
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as string[][];
        
        // Procurar qual linha é o cabeçalho (a que tem 'CPF' e 'NOME')
        let headerIndex = -1;
        for (let i = 0; i < Math.min(5, rows.length); i++) {
          const rowText = rows[i].join(' ').toUpperCase();
          if (rowText.includes('CPF') && (rowText.includes('NOME') || rowText.includes('CLIENTE'))) {
            headerIndex = i;
            break;
          }
        }

        if (headerIndex === -1) {
          alert('Não foi possível encontrar as colunas CPF e NOME na planilha.');
          setImporting(false);
          return;
        }

        const headers = rows[headerIndex].map(h => h.trim().toUpperCase());
        const getCol = (names: string[]) => headers.findIndex(h => names.some(n => h === n || h.includes(n)));

        const cpfIdx = getCol(['CPF']);
        const nomeIdx = getCol(['NOME', 'CLIENTE']);
        const senhaIdx = getCol(['SENHA', 'GOV']);
        const reqIdx = getCol(['REQUERIMENTO', 'SERVICO', 'SERVIÇO']);
        const obsIdx = getCol(['OBSERVAÇÕES', 'OBSERVACOES', 'OBSEVAÇÕES']);
        const recadastroIdx = getCol(['RECADASTRO']);
        const acidenteIdx = getCol(['ACIDENTE']);
        const phoneIdx = getCol(['TELEFONE', 'CELULAR', 'CONTATO']);

        const dataRows = rows.slice(headerIndex + 1);

        const formattedClients = dataRows.map(row => ({
          cpf: cpfIdx >= 0 ? row[cpfIdx]?.trim() : null,
          full_name: nomeIdx >= 0 ? row[nomeIdx]?.trim() : null,
          gov_password: senhaIdx >= 0 ? row[senhaIdx]?.trim() : null,
          requerimento: reqIdx >= 0 ? row[reqIdx]?.trim() : null,
          observacoes: obsIdx >= 0 ? row[obsIdx]?.trim() : null,
          recadastro: recadastroIdx >= 0 ? row[recadastroIdx]?.trim() : null,
          data_acidente: acidenteIdx >= 0 ? row[acidenteIdx]?.trim() : null,
          phone: phoneIdx >= 0 ? row[phoneIdx]?.trim() : null,
        })).filter(c => c.cpf && c.full_name);

        if (formattedClients.length === 0) {
          alert('Nenhum cliente válido encontrado para importar.');
          setImporting(false);
          return;
        }

        try {
          await api.post('/clients/import', { clients: formattedClients });
          alert('Planilha importada com sucesso!');
          fetchClients();
        } catch (error) {
          console.error('Erro na importação:', error);
          alert('Ocorreu um erro ao importar a planilha.');
        } finally {
          setImporting(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      },
      error: (error) => {
        console.error('Erro ao ler CSV:', error);
        alert('Não foi possível ler o arquivo CSV.');
        setImporting(false);
      }
    });
  };

  const filteredClients = clients.filter(c => 
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.cpf.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Meus Clientes
          </h1>
          <p className="text-gray-500 mt-1">Gerencie a carteira de clientes e processos.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            {importing ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
            Importar Google Sheets (CSV)
          </Button>
          
          <Button 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">CPF</th>
                <th className="px-6 py-4">NOME</th>
                <th className="px-6 py-4">SENHA GOV</th>
                <th className="px-6 py-4">REQUERIMENTO</th>
                <th className="px-6 py-4">OBSERVAÇÕES</th>
                <th className="px-6 py-4">RECADASTRO</th>
                <th className="px-6 py-4 whitespace-nowrap">DATA DO ACIDENTE</th>
                <th className="px-6 py-4">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                      Carregando clientes...
                    </div>
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    Nenhum cliente encontrado. Que tal importar sua planilha?
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  return (
                    <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{client.cpf}</td>
                      <td className="px-6 py-3 text-gray-700 font-medium">{client.full_name}</td>
                      <td className="px-6 py-3 text-gray-500">
                        {client.gov_password ? (
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{client.gov_password}</span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-3 text-gray-600">
                        {(client as any).requerimento || '-'}
                      </td>
                      <td className="px-6 py-3 text-gray-500 max-w-xs truncate" title={(client as any).observacoes || ''}>
                        {(client as any).observacoes || '-'}
                      </td>
                      <td className="px-6 py-3 text-gray-500">
                        {(client as any).recadastro ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {(client as any).recadastro}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {(client as any).data_acidente || '-'}
                      </td>
                      <td className="px-6 py-3 text-gray-500">
                        <button
                          onClick={() => handleDelete(client.id, client.full_name)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir Cliente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchClients();
          alert('Cliente criado com sucesso!');
        }}
      />
    </div>
  );
}
