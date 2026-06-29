import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class PendencyController {
  // Criar pendência
  async create(req: Request, res: Response) {
    try {
      const { process_id, description, assigned_to } = req.body;

      const userId = assigned_to || (req as any).user.id;

      const pendency = await prisma.pendency.create({
        data: {
          process_id,
          description,
          assigned_to: userId,
        },
        include: {
          process: {
            include: {
              client: true
            }
          }
        }
      });

      return res.status(201).json(pendency);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Erro ao criar pendência' });
    }
  }

  // Listar pendências abertas
  async listOpen(req: Request, res: Response) {
    try {
      const pendencies = await prisma.pendency.findMany({
        where: { status: 'OPEN' },
        include: {
          process: {
            include: {
              client: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      });
      return res.json(pendencies);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar pendências' });
    }
  }

  // Resolver pendência
  async resolve(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pendency = await prisma.pendency.update({
        where: { id: id as string },
        data: { 
          status: 'RESOLVED',
          resolved_at: new Date()
        },
      });

      return res.json(pendency);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao resolver pendência' });
    }
  }
}
