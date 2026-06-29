"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.adminMiddleware = adminMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-pinheiro';
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}
function adminMiddleware(req, res, next) {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }
    return next();
}
