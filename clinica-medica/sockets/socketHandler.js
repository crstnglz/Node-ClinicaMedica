import { setIO } from './io.js';

const socketHandler = (io) => {
    setIO(io);
    
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        })
    })
}

export default socketHandler;