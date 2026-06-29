import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Plus, Users, Shield } from 'lucide-react';
import { api } from '../../../services/api';
import { UserModal } from '../components/UserModal';
import { useAuth } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function UsersPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  // Apenas admins podem acessar
  if (user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Gestão de Equipe
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie os corretores e administradores com acesso ao sistema.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-[#0D0D0D]/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usuário</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">E-mail</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cargo / Acesso</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cadastrado em</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-card-dark divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Carregando equipe...
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="table-row-hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{u.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {u.role === 'ADMIN' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Shield className="w-3 h-3 mr-1" /> Administrador
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Corretor (Agent)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchUsers} 
      />
    </div>
  );
}
