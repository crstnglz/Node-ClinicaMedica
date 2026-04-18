import { DataTypes, Model } from "sequelize";
import db from '../../database/conexion.js';

class Cita extends Model {}

Cita.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_medico: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        duracion_min: {
            type: DataTypes.INTEGER,
            defaultValue: 30
        },
        estado: {
            type: DataTypes.STRING,
            defaultValue: 'pendiente',
            validate: {
                isIn: [['pendiente', 'en_curso', 'finalizada', 'cancelada']]
            }
        },
        motivo: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: db,
        tableName: 'citas',
        modelName: 'Cita',
        timestamps: false
    }
);

export default Cita;