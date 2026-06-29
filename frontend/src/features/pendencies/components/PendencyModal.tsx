import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { api } from '../../../services/api';

interface PendencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PendencyModal({ isOpen, onClose, onSuccess }: PendencyModalProps) {
  const [formData, setFormData] = useState({
    process_id: '',
    description: '',
  });
  
  const [processes, setProcesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      api.get('/processes')
        .then(res => setProcesses(res.data))
        .catch(err => console.error("Failed to load processes", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/pendencies', formData);
      onSuccess();
      onClose();
      setFormData({ process_id: '', description: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar pendência');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 mx-4 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Nova Pendência</h3>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Processo Afetado</label>
            <select
              name="process_id"
              required
              value={formData.process_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
            >
              <option value="">Selecione o Processo</option>
              {processes.map(p => (
                <option key={p.id} value={p.id}>
                  {p.client.full_name} - {p.service_type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição do Gargalo / Problema</label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
              placeholder="Ex: Falta RG, Aguardando assinatura..."
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 dark:border-gray-800 mt-6">
            <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Criar Pendência'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
