import bcryptjs from 'bcryptjs';
import Usuario from '../models/sql/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';

const registro = async (req, res) => {
    const { nombre, email, password, rol ,especialidad } = req.body;

    try {
        const usuarioExiste = await Usuario.findOne({ where: { email }});
        if(usuarioExiste)
        {
            return res.status(400).json({ msg: 'Ya existe un usuario con ese email.' });
        }

        const salt = bcryptjs.genSaltSync(10);
        const passwordHash = bcryptjs.hashSync(password, salt);

        const usuario = await Usuario.create({
            nombre, email,
            password: passwordHash,
            rol,
            especialidad
        });

        const token = generarJWT(usuario.id, usuario.rol);

        res.status(201).json({ usuario, token });
    }catch (err){
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if(!usuario)
        {
            return res.status(400).json({ msg: 'Credenciales incorrectas.' });
        }
        const passwordValido = bcryptjs.compareSync(password, usuario.password);
        if(!passwordValido)
        {
            return res.status(400).json({ msg: 'Credenciales incorrectas.' });
        }

        const token = generarJWT(usuario.id, usuario.rol);

        res.status(200).json({ usuario, token });
    }catch(err)
    {
        res.status(500).json({ msg: 'Error en el servidor.', error: err.message });
    }
}

export { registro, login };