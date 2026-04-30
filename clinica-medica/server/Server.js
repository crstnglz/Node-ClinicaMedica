import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authRoutes from '../routes/authRoutes.js';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import pacienteRoutes from '../routes/pacienteRoutes.js';
import citaRoutes from '../routes/citaRoutes.js';
import historialRoutes from '../routes/historialRoutes.js';
import socketHandler from '../sockets/socketHandler.js';
import typeDefs from '../graphql/typeDefs.js';
import resolvers from '../graphql/resolvers.js';

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
        this.graphQLPath = '/graphql';

        this.middlewares();
        this.rutas();
        this.sockets();
    }

    middlewares()
    {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(join(__dirname, '../cliente')));
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

    async initApollo()
    {
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true
        });
        await apolloServer.start();
        this.app.use(
            this.graphQLPath,
            cors(),
            express.json(),
            expressMiddleware(apolloServer)
        );

        console.log(`GraphQL disponible en http://localhost:${this.port}${this.graphQLPath}`);
    }

    listen() 
    {
        this.httpServer.listen(this.port, () => {
            console.log(`🌍 Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export { Server };