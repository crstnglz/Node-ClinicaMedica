import { DataTypes, Model } from 'sequelize';
import db from '../../database/conexion.js';

class Usuario extends Model {}

Usuario.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isIn: [['admin', 'medico', 'recepcionista']]
            }
        },
        especialidad: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: db,
        tableName: 'usuarios',
        modelName: 'Usuario',
        timestamps: false
    }
);

export default Usuario;