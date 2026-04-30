import Paciente from '../models/sql/Paciente.js';

const getPacientes = async(req, res) => {
    try 
    {
        const pacientes = await Paciente.findAll();
        res.status(200).json(pacientes); 
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const getPaciente = async(req, res) => {
    const { id } = req.params;
     try 
     {
        const paciente = await Paciente.findByPk(id);
        if(!paciente)
        {
            return res.status(404).json({ msg: 'Paciente no encontrado.' });
        }
        res.status(200).json(paciente);
     }catch(err)
     {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
     }
}

const crearPaciente = async(req, res) => {
    const { nombre, apellidos, dni, fecha_nacimiento, telefono, email } = req.body;
    try 
    {
        const pacienteExiste = await Paciente.findOne({ where: { dni, } });
        if(pacienteExiste)
        {
            return res.status(400).json({ msg: 'Ya existe un paciente con ese DNI.' });
        }
        const paciente = await Paciente.create({ nombre, apellidos, dni, fecha_nacimiento, telefono, email });
        res.status(201).json(paciente);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const actualizarPaciente = async(req, res) => {
    const { id } = req.params; 
    const { nombre, apellidos, telefono, email } = req.body; 
    try 
    {
        const paciente = await Paciente.findByPk(id); 
        if(!paciente)
        {
            return res.status(404).json({ msg: 'Paciente no encontrado.' });
        }
        await paciente.update({ nombre, apellidos, telefono, email });
        res.status(200).json(paciente); 
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const eliminarPaciente = async(req, res) => {
    const { id } = req.params; 
    try 
    {
        const paciente = await Paciente.findByPk(id);
        if(!paciente)
        {
            return res.status(404).json({ msg: 'Paciente no encontrado.' });
        }
        await paciente.destroy();
        res.status(200).json({ msg: 'Paciente eliminado correctamente.' });
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

export { getPacientes, getPaciente, crearPaciente, actualizarPaciente, eliminarPaciente }