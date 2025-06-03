import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { authenticateJWT } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', authenticateJWT, usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', authenticateJWT, usuarioController.updateUsuario);
router.delete('/:id', authenticateJWT, usuarioController.deleteUsuario);

export default router;
