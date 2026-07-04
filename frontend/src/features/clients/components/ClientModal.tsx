import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { api } from '../../../services/api';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ClientModal({ isOpen, onClose, onSuccess }: ClientModalProps) {
  const [formData, setFormData] = useState({
    cpf: '',
    full_name: '',
    phone: '',
    email: '',
    gov_password: '',
    requerimento: '',
    observacoes: '',
    recadastro: '',
    data_acidente: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/clients', formData);
      onSuccess();
      onClose();
      setFormData({
        cpf: '',
        full_name: '',
        phone: '',
        email: '',
        gov_password: '',
        requerimento: '',
        observacoes: '',
        recadastro: '',
        data_acidente: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl p-6 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 my-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Novo Cliente</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF *</label>
              <input
                type="text"
                name="cpf"
                required
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo *</label>
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha Gov.br</label>
              <input
                type="text"
                name="gov_password"
                value={formData.gov_password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requerimento</label>
              <input
                type="text"
                name="requerimento"
                value={formData.requerimento}
                onChange={handleChange}
                placeholder="Ex: GUIA INDIVIDUAL"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recadastro</label>
              <input
                type="text"
                name="recadastro"
                value={formData.recadastro}
                onChange={handleChange}
                placeholder="Ex: RECADASTRADO 02/06"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data do Acidente</label>
              <input
                type="text"
                name="data_acidente"
                value={formData.data_acidente}
                onChange={handleChange}
                placeholder="Ex: 3/23/2026"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observações</label>
            <textarea
              name="observacoes"
              rows={2}
              value={formData.observacoes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 dark:border-gray-800 mt-6">
            <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Cliente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
