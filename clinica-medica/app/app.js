import dotenv from 'dotenv';
dotenv.config();

import '../database/conexion.js';
import '../database/mongodb.js'
import '../models/sql/Asociaciones.js'
import { Server } from '../server/server.js';
import conectarMongoDB from '../database/mongodb.js';

conectarMongoDB();

const server = new Server();
server.listen();