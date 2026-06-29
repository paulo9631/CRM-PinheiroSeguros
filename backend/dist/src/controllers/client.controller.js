"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const prisma_1 = require("../prisma");
class ClientController {
    // Criar um novo cliente
    async create(req, res) {
        try {
            const { full_name, cpf, phone, email, birth_date, address, gov_password } = req.body;
            const userId = req.user.id;
            const client = await prisma_1.prisma.client.create({
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
        }
        catch (error) {
            console.error('Erro ao criar cliente:', error);
            return res.status(400).json({ error: error.message || 'Erro ao criar cliente' });
        }
    }
    // Listar todos os clientes
    async list(req, res) {
        try {
            const clients = await prisma_1.prisma.client.findMany({
                orderBy: { created_at: 'desc' },
            });
            return res.json(clients);
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro ao listar clientes' });
        }
    }
}
exports.ClientController = ClientController;
