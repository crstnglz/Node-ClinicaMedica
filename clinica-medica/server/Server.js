import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
dotenv.config();

import authRoutes from '../routes/authRoutes.js';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import pacienteRoutes from '../routes/pacienteRoutes.js';
import citaRoutes from '../routes/citaRoutes.js';
import historialRoutes from '../routes/historialRoutes.js';
import socketHandler from '../sockets/socketHandler.js';

class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.httpServer = createServer(this.app);
        this.io = new SocketServer(this.httpServer, {
            cors: { origin: '*' }
        });

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.pacientesPath = '/api/pacientes';
        this.citasPath = '/api/citas';
        this.historialPath = '/api/historial';

        this.middlewares();
        this.rutas();
        this.sockets();
    }

    middlewares()
    {
        this.app.use(cors());
        this.app.use(express.json());
    }

    rutas() 
    {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.usuariosPath, usuarioRoutes);
        this.app.use(this.pacientesPath, pacienteRoutes);
        this.app.use(this.citasPath, citaRoutes);
        this.app.use(this.historialPath, historialRoutes);
    }
    sockets()
    {
        socketHandler(this.io);
    }

    listen() 
    {
        this.app.listen(this.port, () => {
            console.log(`🌍 Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export { Server };