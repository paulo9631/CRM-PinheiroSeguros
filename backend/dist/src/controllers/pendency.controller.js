"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendencyController = void 0;
const prisma_1 = require("../prisma");
class PendencyController {
    // Criar pendência
    async create(req, res) {
        try {
            const { process_id, description, assigned_to } = req.body;
            const userId = assigned_to || req.user.id;
            const pendency = await prisma_1.prisma.pendency.create({
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
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao criar pendência' });
        }
    }
    // Listar pendências abertas
    async listOpen(req, res) {
        try {
            const pendencies = await prisma_1.prisma.pendency.findMany({
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
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro ao listar pendências' });
        }
    }
    // Resolver pendência
    async resolve(req, res) {
        try {
            const { id } = req.params;
            const pendency = await prisma_1.prisma.pendency.update({
                where: { id: id },
                data: {
                    status: 'RESOLVED',
                    resolved_at: new Date()
                },
            });
            return res.json(pendency);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao resolver pendência' });
        }
    }
}
exports.PendencyController = PendencyController;
