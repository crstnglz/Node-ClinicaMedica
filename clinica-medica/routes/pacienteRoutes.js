import { Router } from 'express';
import { check } from 'express-validator';
import { getPacientes, getPaciente, crearPaciente, actualizarPaciente, eliminarPaciente, generarPacientes } from '../controllers/pacienteController.js';
import validarJWT from '../middlewares/validarJWT.js';
import { esAdmin, esRecepcionista } from '../middlewares/validarRoles.js';
import validarCampos from '../middlewares/validarCampos.js';

const router = Router();

router.get('/', validarJWT, getPacientes);
router.get('/:id', validarJWT, getPaciente);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').notEmpty(),
    check('dni', 'El DNI es obligatorio').notEmpty(),
    validarCampos
], crearPaciente);

router.put('/:id', validarJWT, actualizarPaciente);
router.delete('/:id', [validarJWT, esAdmin], eliminarPaciente);
router.post('/generar/:cantidad', [validarJWT, esAdmin], generarPacientes);

export default router;