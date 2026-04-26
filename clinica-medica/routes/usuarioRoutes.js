import { Router } from 'express';
import { check } from 'express-validator';
import { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';
import validarJWT from '../middlewares/validarJWT.js';
import { esAdmin } from '../middlewares/validarRoles.js';
import validarCampos from '../middlewares/validarCampos.js';

const router = Router();

router.get('/', [validarJWT, esAdmin], getUsuarios);
router.get('/:id', [validarJWT, esAdmin], getUsuario); 

router.post('/', [
    validarJWT,
    esAdmin,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('rol', 'El rol debe ser admin, medico o recepcionista').isIn(['admin', 'medico', 'recepcionista']),
    validarCampos
], crearUsuario);

router.put('/:id', [validarJWT, esAdmin], actualizarUsuario);
router.delete('/:id', [validarJWT, esAdmin], eliminarUsuario);

export default router;