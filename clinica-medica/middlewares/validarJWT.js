import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if(!token)
    {
        return res.status(401).json({ msg: 'No hay token en la petición.' });
    }

    try {
        const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = id;
        req.usuarioRol = rol;
        next();
    }catch(error)
    {
        res.status(401).json({ msg: 'Token no válido.' });
    }
};

export default validarJWT;