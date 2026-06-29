"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const clientRoutes = (0, express_1.Router)();
const clientController = new client_controller_1.ClientController();
clientRoutes.post('/', clientController.create);
clientRoutes.get('/', clientController.list);
exports.default = clientRoutes;
