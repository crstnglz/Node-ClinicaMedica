import Paciente from "./Paciente.js";
import Usuario from "./Usuario.js";
import Cita from "./Cita.js";

Paciente.hasMany(Cita, { as: 'citas', foreignKey: 'id_paciente' });
Cita.belongsTo(Paciente, { as: 'paciente', foreignKey: 'id_paciente' });

Usuario.hasMany(Cita, { as: 'citas', foreignKey: 'id_medico' });
Cita.belongsTo(Usuario, { as: 'medico', foreignKey: 'id_medico' });

export { Paciente, Usuario, Cita }; 