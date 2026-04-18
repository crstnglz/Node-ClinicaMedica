import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const conectarMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.MONGO_DATABASE
        });
        console.log('🟢 Conexión con MongoDB establecida');
    } catch(err){
        console.error('❌ Error conectando MongoDB:', err);
        process.exit(1);
    }
};

export default conectarMongoDB;