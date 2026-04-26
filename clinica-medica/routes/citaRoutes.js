import { Router } from 'express';
import { check } from 'express-validator';
import { getCitas, getCita, crearCita, actualizarEstadoCita, cancelarCita, eliminarCita } from '../controllers/citaController.js';
import validarJWT from '../middlewares/validarJWT.js';
import { esAdmin, esMedico, esMedicoOAdmin } from '../middlewares/validarRoles.js';
import validarCampos from '../middlewares/validarCampos.js';

const router = Router();

router.get('/', validarJWT, getCitas);
router.get('/:id', validarJWT, getCita);

router.post('/', [
    validarJWT, 
    check('id_paciente', 'El paciente es obligatorio').notEmpty(),
    check('id_medico', 'El médico es obligatorio').notEmpty(),
    check('fecha', 'La fecha es obligatoria').notEmpty(),
    check('hora', 'La hora es obligatoria').notEmpty(),
    validarCampos 
], crearCita);

router.patch('/:id/estado', [validarJWT, esMedicoOAdmin], actualizarEstadoCita);
router.patch('/:id/cancelar', validarJWT, cancelarCita);
router.delete('/:id', [validarJWT, esAdmin], eliminarCita);

export default router;