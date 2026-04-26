import bcryptjs from 'bcryptjs';
import Usuario from '../models/sql/Usuario.js';

const getUsuarios = async (req, res) => {
    try 
    {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const getUsuario = async(req, res) => {
    const { id } = req.params;
    try 
    {
        const usuario = await Usuario.findByPk(id);
        if(!usuario)
        {
            return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }
        res.status(200).json(usuario);
    }catch(err) 
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const crearUsuario = async(req, res) => {
    const { nombre, email, password, rol, especialidad } = req.body;
    try 
    {
        const usuarioExiste = await Usuario.findOne({ where: { email } });
        if(usuarioExiste)
        {
            return res.status(400).sjon({ msg: 'Ya existe un usuario con ese email.' });
        }
        const salt = bcryptjs.genSaltSync(10);
        const passwordHash = bcryptjs.hashSync(password, salt);
        const usuario = await Usuario.create({ nombre, email, password: passwordHash, rol, especialidad });
        res.status(201).json(usuario);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const actualizarUsuario = async(req, est) => {
    const { id } = req.params;
    const { nombre, email, especialidad } = req.body; 
    try 
    {
        const usuario = await Usuario.findByPk(id);
        if(!usuario) 
        {
            return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }
        await usuario.update({ nombre, email, especialidad });
        res.status(200).json(usuario);
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const eliminarUsuario = async(req, res) => {
    const { id } = req.params; 
    try 
    {
        const usuario = await Usuario.findByPk(id);
        if(!usuario) 
        {
            return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }
        await usuario.destroy();
        res.status(200).json({ msg: 'Usuario eliminado correctamente.' });
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

export { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, eliminarUsuario }