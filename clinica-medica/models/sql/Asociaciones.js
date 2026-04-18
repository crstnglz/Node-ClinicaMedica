import Paciente from "./Paciente.js";
import Usuario from "./Usuario.js";
import Cita from "./Cita.js";

Paciente.hasMany(Cita, { as: 'citas', foreignKey: 'id_paciente' });
Cita.belongsTo(Paciente, { as: 'medico', foreignKey: 'id_medico' });

Usuario.hasMany(Cita, { as: 'citas', foreignKey: 'id_medico' });
Cita.belongsTo(Usuario, { as: 'paciente', foreignKey: 'id_medico' });

export { Paciente, Usuario, Cita }; 