import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;

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

    }

    listen() 
    {
        this.app.listen(this.port, () => {
            console.log(`🌍 Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export { Server };