import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '../routes/authRoutes.js';

class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';

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
    }

    listen() 
    {
        this.app.listen(this.port, () => {
            console.log(`🌍 Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export { Server };