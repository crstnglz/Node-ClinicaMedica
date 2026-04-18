import mongoose from 'mongoose';

const entradaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    id_medico: {
        type: Number,
        required: true
    },
    observaciones: {
        type: String
    },
    diagnostico: {
        type: String
    },
    tratamiento: {
        type: String
    }
});

const historialClinicoSchema = new mongoose.Schema({
    id_paciente: {
        type: Number,
        required: true,
        unique: true
    },
    entradas: [entradaSchema]
});

const HistorialClinico = mongoose.model('HistorialClinico', historialClinicoSchema);

export default HistorialClinico;