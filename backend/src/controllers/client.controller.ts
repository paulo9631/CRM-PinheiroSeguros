import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class ClientController {
  // Criar um novo cliente
  async create(req: Request, res: Response) {
    try {
      const { full_name, cpf, phone, email, birth_date, address, gov_password, requerimento, observacoes, recadastro, data_acidente } = req.body;
      const userId = (req as any).user.id;

      const client = await prisma.client.create({
        data: {
          full_name,
          cpf,
          phone,
          email,
          birth_date: birth_date ? new Date(birth_date) : null,
          address,
          gov_password,
          requerimento,
          observacoes,
          recadastro,
          data_acidente,
          created_by: userId,
        },
      });

      return res.status(201).json(client);
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);
      return res.status(400).json({ error: error.message || 'Erro ao criar cliente' });
    }
  }

  // Importar clientes em massa (via CSV/Planilha)
  async importData(req: Request, res: Response) {
    try {
      const { clients } = req.body;
      const userId = (req as any).user.id;

      if (!Array.isArray(clients) || clients.length === 0) {
        return res.status(400).json({ error: 'Nenhum dado válido para importação.' });
      }

      let imported = 0;
      let errors = [];

      for (const row of clients) {
        try {
          if (!row.cpf || !row.full_name) {
            continue; // Pula linhas vazias
          }

          // 1. Criar ou atualizar o Cliente (Upsert)
          const client = await prisma.client.upsert({
            where: { cpf: row.cpf },
            update: {
              full_name: row.full_name,
              gov_password: row.gov_password || null,
              phone: row.phone || null,
              requerimento: row.requerimento || null,
              observacoes: row.observacoes || null,
              recadastro: row.recadastro || null,
              data_acidente: row.data_acidente || null,
            },
            create: {
              cpf: row.cpf,
              full_name: row.full_name,
              gov_password: row.gov_password || null,
              phone: row.phone || 'Não informado',
              requerimento: row.requerimento || null,
              observacoes: row.observacoes || null,
              recadastro: row.recadastro || null,
              data_acidente: row.data_acidente || null,
              created_by: userId,
            }
          });

          // Removido: A pedido do usuário, a importação não deve criar processos automaticamente, apenas cadastrar o cliente.

          imported++;
        } catch (err: any) {
          errors.push({ cpf: row.cpf, error: err.message });
        }
      }

      return res.status(200).json({ 
        message: 'Importação concluída', 
        imported, 
        errors: errors.length > 0 ? errors : undefined 
      });
    } catch (error: any) {
      console.error('Erro na importação:', error);
      return res.status(500).json({ error: 'Erro interno durante a importação.' });
    }
  }

  // Listar todos os clientes
  async list(req: Request, res: Response) {
    try {
      // Retornar também os processos para o Data Grid ficar completo
      const clients = await prisma.client.findMany({
        orderBy: { created_at: 'desc' },
        include: {
          processes: {
            orderBy: { created_at: 'desc' },
            take: 1 // Pega o processo mais recente para exibir na tabela
          }
        }
      });
      return res.json(clients);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  }

  // Excluir um cliente e seus processos vinculados
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Primeiro, excluímos as dependências (processos e pendências)
      const processes = await prisma.process.findMany({ where: { client_id: id } });
      for (const proc of processes) {
        await prisma.pendency.deleteMany({ where: { process_id: proc.id } });
      }
      await prisma.process.deleteMany({ where: { client_id: id } });
      
      // Por fim, excluímos o cliente
      await prisma.client.delete({ where: { id } });
      
      return res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      return res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
  }
}
