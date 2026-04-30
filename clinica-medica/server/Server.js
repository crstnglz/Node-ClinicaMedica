import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '../routes/authRoutes.js';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import pacienteRoutes from '../routes/pacienteRoutes.js';
import citaRoutes from '../routes/citaRoutes.js';
import historialRoutes from '../routes/historialRoutes.js';

class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.pacientesPath = '/api/pacientes';
        this.citasPath = '/api/citas';
        this.historialPath = '/api/historial';

        this.middlewares();
        this.rutas();
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

    listen() 
    {
        this.app.listen(this.port, () => {
            console.log(`🌍 Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export { Server };