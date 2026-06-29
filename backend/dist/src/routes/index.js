"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const client_routes_1 = __importDefault(require("./client.routes"));
const process_routes_1 = __importDefault(require("./process.routes"));
const pendency_routes_1 = __importDefault(require("./pendency.routes"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const routes = (0, express_1.Router)();
routes.use('/auth', auth_routes_1.default);
// Protected routes
routes.use('/clients', auth_middleware_1.authMiddleware, client_routes_1.default);
routes.use('/processes', auth_middleware_1.authMiddleware, process_routes_1.default);
routes.use('/pendencies', auth_middleware_1.authMiddleware, pendency_routes_1.default);
exports.default = routes;
