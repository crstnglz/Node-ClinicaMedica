import { DataTypes, Model } from 'sequelize';
import db from '../../database/conexion.js';

class Paciente extends Model {}

Paciente.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY
        },
        telefono: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize: db,
        tableName: 'pacientes',
        modelName: 'Paciente',
        timestamps: false
    }
);

export default Paciente;