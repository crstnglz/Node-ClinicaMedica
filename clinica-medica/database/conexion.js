import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new  Sequelize(
    process.env.DB_DEV,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: parseInt(process.env.DB_MAXCONNECTIONS),
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    }
);

(async () => {
    try {
        await db.authenticate();
        console.log('🔵 Conexión con PostgreSQL establecida');
    } catch (err) {
        console.error('❌ Error en la conexión:', err);
    }
})();

process.on('SIGINT', async() => {
    try {
        await db.close();
        console.log('✅ Conexiones cerradas correctamente');
        process.removeListener(0);
    }catch (err){
        console.error('❌ Error cerrando conexiones:', err);
        process.exit(1);
    }
});

export default db;