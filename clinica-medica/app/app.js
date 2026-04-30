import dotenv from 'dotenv';
dotenv.config();

import '../database/conexion.js';
import conectarMongoDB from '../database/mongodb.js';
import '../models/sql/Asociaciones.js'
import { Server } from '../server/server.js';

conectarMongoDB();

const server = new Server();
server.listen();