"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-pinheiro';
class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(401).json({ error: 'E-mail ou senha incorretos' });
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'E-mail ou senha incorretos' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const userExists = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            if (userExists) {
                return res.status(400).json({ error: 'E-mail já está em uso' });
            }
            const password_hash = await bcrypt_1.default.hash(password, 10);
            const user = await prisma_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password_hash,
                    role: role || 'AGENT',
                },
            });
            return res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }
    async listUsers(req, res) {
        try {
            const users = await prisma_1.prisma.user.findMany({
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
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }
}
exports.AuthController = AuthController;
