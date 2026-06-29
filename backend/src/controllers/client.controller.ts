import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class ClientController {
  // Criar um novo cliente
  async create(req: Request, res: Response) {
    try {
      const { full_name, cpf, phone, email, birth_date, address, gov_password } = req.body;
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
          created_by: userId,
        },
      });

      return res.status(201).json(client);
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);
      return res.status(400).json({ error: error.message || 'Erro ao criar cliente' });
    }
  }

  // Listar todos os clientes
  async list(req: Request, res: Response) {
    try {
      const clients = await prisma.client.findMany({
        orderBy: { created_at: 'desc' },
      });
      return res.json(clients);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  }
}
