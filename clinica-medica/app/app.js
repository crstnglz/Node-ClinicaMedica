import dotenv from 'dotenv';
dotenv.config();

import '../database/conexion.js';
import '../models/sql/Asociaciones.js'
import { Server } from '../server/Server.js';

const server = new Server();
server.listen();