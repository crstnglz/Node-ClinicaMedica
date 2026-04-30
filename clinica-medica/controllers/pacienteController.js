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

const generarPacientes = async(req, res) => {
    const { cantidad } = req.params;
    const n = parseInt(cantidad);

    if(isNaN(n) || n < 1 || n > 100)
    {
        return res.status(400).json({ msg: 'La cantidad debe ser un número entre 1 y 100.' });
    }

    try 
    {
        const { fakerES: faker } = await import('@faker-js/faker');
        const pacientes = [];

        for(let i = 0; i < n; i++)
        {
            pacientes.push({
                nombre: faker.person.firstName(),
                apellidos: faker.person.lastName(),
                dni: faker.string.alphanumeric(9).toUpperCase(),
                fecha_nacimiento: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toISOString().split('T')[0],
                telefono: faker.phone.number(),
                email: faker.internet.email()
            });
        }
        await Paciente.bulkCreate(pacientes, { ignoreDuplicates: true });
        res.status(201).json({ msg: `${n} pacientes generados correctamente.`, cantidad: n});
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

export { getPacientes, getPaciente, crearPaciente, actualizarPaciente, eliminarPaciente, generarPacientes }