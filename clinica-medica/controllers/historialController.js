import HistorialClinico from '../models/mongo/HistorialClinico.js';

const getHistorial = async (req, res) => {
    const { id_paciente } = req.params;
    try 
    {
        const historial = await HistorialClinico.findOne({ id_paciente });
        if(!historial)
        {
            return res.status(404).json({ msg: 'No se encontró historial para este paciente.' });
        }
        res.status(200).json(historial);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const agregarEntrada = async(req, res) => {
    const { id_paciente } = req.params;
    const { observaciones, diagnostico, tratamiento } = req.body; 
    const id_medico = req.usuarioId;

    try {
        let historial = await HistorialClinico.findOne({ id_paciente });

        if(!historial)
        {
            historial = new HistorialClinico({ id_paciente, entradas: [] });
        }

        historial.entradas.push({
            fecha: new Date(),
            id_medico,
            observaciones, 
            diagnostico,
            tratamiento
        });

        await historial.save();
        res.status(201).json(historial);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

export { getHistorial, agregarEntrada }