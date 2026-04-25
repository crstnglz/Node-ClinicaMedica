import { Router } from "express";
import { check } from 'express-validator';
import { registro, login } from '../controllers/authController.js';
import validarCampos from '../middlewares/validarCampos.js'

const router = Router();

router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('rol', 'El rol debe ser admin, medico o recepcionista').isIn(['admin', 'medico', 'recepcionista']),
    validarCampos
], registro);

router.post('/login', [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La password es obligatoria').notEmpty(),
    validarCampos
], login);

export default router;