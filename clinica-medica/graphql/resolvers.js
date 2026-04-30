import { Cita } from '../models/sql/Asociaciones.js';
import HistorialClinico from '../models/mongo/HistorialClinico.js';
import { Op, fn, col, literal } from 'sequelize';

const resolvers = {
    Query: {
        citasFinalizadasPorMedico: async() => {
            const resultado = await Cita.findAll({
                where: { estado: 'finalizada' },
                attributes: [
                    'id_medico',
                    [fn('COUNT', col('id')), 'total']
                ],
                group: ['id_medico'],
                raw: true
            });
            return resultado.map(r => ({
                id_medico: r.id_medico,
                total: parseInt(r.total)
            }));
        },

        citasPendientesHoy: async() => {
            const hoy = new Date().toISOString().split('T')[0];
            return await Cita.findAll({
                where: {
                    estado: 'pendiente',
                    fecha: hoy
                },
                raw: true
            });
        },

        duracionPromedioporMedico: async() => {
            const resultado = await Cita.findAll({
                attributes: [
                    'id_medico', 
                    [fn('AVG', col('duracion_min')), 'promedio']
                ],
                group: ['id_medico'],
                raw: true
            });
            return resultado.map(r => ({
                id_medico: r.id_medico,
                promedio: parseFloat(r.promedio)
            }));
        },

        historialPaciente: async(__dirname, { id_paciente }) => {
            const historial = await HistorialClinico.findOne({ id_paciente });
            if(!historial) return null;
            return historial;
        }
    }
}

export default resolvers;