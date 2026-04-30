import { Router } from 'express';
import { check } from 'express-validator';
import { getHistorial, agregarEntrada } from '../controllers/historialController.js';
import validarJWT from '../middlewares/validarJWT.js';
import { esMedico, esMedicoOAdmin } from '../middlewares/validarRoles.js';
import validarCampos from '../middlewares/validarCampos.js';

const router = Router();

router.get('/:id_paciente', [validarJWT, esMedicoOAdmin], getHistorial);

router.post('/:id_paciente', [
    validarJWT,
    esMedicoOAdmin,
    check('observaciones', 'Las observaciones son obligatorias').notEmpty(),
    check('diagnostica', 'El diagnóstico es obligatorio').notEmpty(),
    validarCampos 
], agregarEntrada);

export default router;