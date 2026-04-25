import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generarJWT = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: '4h'
    });
};

export default generarJWT;