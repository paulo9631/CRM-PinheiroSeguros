"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessController = void 0;
const prisma_1 = require("../prisma");
const client_1 = require("@prisma/client");
class ProcessController {
    // Criar um novo processo
    async create(req, res) {
        try {
            const { client_id, category, service_type, description, observations, accident_date, re_registration_date } = req.body;
            // Validate client exists
            const client = await prisma_1.prisma.client.findUnique({
                where: { id: client_id },
            });
            if (!client) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            const process = await prisma_1.prisma.process.create({
                data: {
                    client_id,
                    category: category,
                    service_type,
                    description,
                    observations,
                    accident_date: accident_date ? new Date(accident_date) : null,
                    re_registration_date: re_registration_date ? new Date(re_registration_date) : null,
                    status: client_1.ProcessStatus.TRIAGEM, // Default status
                },
                include: {
                    client: true,
                },
            });
            return res.status(201).json(process);
        }
        catch (error) {
            console.error('Erro ao criar processo:', error);
            return res.status(400).json({ error: 'Erro ao criar processo' });
        }
    }
    // Listar todos os processos (ou filtrar por cliente)
    async list(req, res) {
        try {
            const { client_id } = req.query;
            const processes = await prisma_1.prisma.process.findMany({
                where: client_id ? { client_id: String(client_id) } : undefined,
                include: {
                    client: {
                        select: {
                            full_name: true,
                            cpf: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            });
            return res.json(processes);
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro ao listar processos' });
        }
    }
    // Atualizar status do processo
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedProcess = await prisma_1.prisma.process.update({
                where: { id: id },
                data: { status: status },
            });
            return res.json(updatedProcess);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar status do processo' });
        }
    }
}
exports.ProcessController = ProcessController;
