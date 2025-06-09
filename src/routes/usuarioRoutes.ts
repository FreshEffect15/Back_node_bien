import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { authenticateJWT, adminOnly } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', authenticateJWT, usuarioController.getAllUsuarios);
router.get('/:id', authenticateJWT, usuarioController.getUsuarioById);
router.post('/', authenticateJWT, adminOnly, usuarioController.createUsuario);
router.put('/:id', authenticateJWT, adminOnly, usuarioController.updateUsuario);
router.delete('/:id', authenticateJWT, adminOnly, usuarioController.deleteUsuario);

export default router;
