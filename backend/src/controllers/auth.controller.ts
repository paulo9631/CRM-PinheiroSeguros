import { Request, Response } from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-pinheiro';

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'E-mail já está em uso' });
      }

      const password_hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password_hash,
          role: (role as Role) || 'AGENT',
        },
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          created_at: true,
        },
        orderBy: { created_at: 'desc' }
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
}
