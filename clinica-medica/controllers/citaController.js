import { Cita, Paciente, Usuario } from '../models/sql/Asociaciones.js';
import { getIO } from '../sockets/io.js';

const getCitas = async(req, res) => {
    try {
        const where = {}

        if(req.usuarioRol === 'medico')
        {
            where.id_medico = req.usuarioId;
        }
        
        const citas = await Cita.findAll({
            where,
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Usuario, as: 'medico' }
            ]
        });
        res.status(200).json(citas);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const getCita = async(req, res) => {
    const { id } = req.params;
    try 
    {
        const cita = await Cita.findByPk(id, {
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Usuario, as: 'medico' }
            ]
        });
        if(!cita)
        {
            return res.status(404).json({ msg: 'Cita no encontrada.' })
        }
        res.status(200).json(cita);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const crearCita = async(req, res) => {
    const { id_paciente, id_medico, fecha, hora, duracion_min, motivo } = req.body;
    try 
    {
        const cita = await Cita.create({ id_paciente, id_medico, fecha, hora, duracion_min, motivo });
        
        const io = getIO();
        if(io) io.emit('cita:nueva', cita);
        res.status(201).json(cita); 
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const actualizarEstadoCita = async(req, res) => {
    const { id } = req.params; 
    const { estado } = req.body;
    try 
    {
        const cita = await Cita.findByPk(id);
        if(!cita)
        {
            const io = getIO();
            if(io) io.emit('cita:estado', cita);
            return res.status(404).json({ msg: 'CIta no encontrada.' });
        }
        await cita.update({ estado });
        res.status(200).json(cita);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const cancelarCita = async(req, res) => {
    const { id } = req.params; 
    try 
    {
        const cita = await Cita.findByPk(id);
        if(!cita)
        {
            const io = getIO();
            if(io) io.emit('cita: cancelada', cita);
            return res.status(404).json({ msg: 'Cita no encontrada.' });
        }
        await cita.update({ estado: 'cancelada' });
        res.status(200).json(cita);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const eliminarCita = async(req ,res) => {
    const { id } = req.params; 
    try 
    {
        const cita = await Cita.findByPk(id);
        if(!cita)
        {
            const io = getIO();
            if(io) io.emit('cita:estado', cita);
            return res.status(404).json({ msg: 'Cita no encontrada.' });
        }
        await cita.destroy();
        res.status(200).json({ msg: 'Cita eliminada correctamente.' });
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

export { getCitas, getCita, crearCita, actualizarEstadoCita, cancelarCita, eliminarCita }