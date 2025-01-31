"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const node_path_1 = require("node:path");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
app.get('/', (req, res) => {
    res.send((0, node_path_1.join)(__dirname, 'index.html'));
});
server.listen(3000, () => {
    console.log(' server running at http://localhost:3000');
});
