import { Router } from 'express';
import * as typeController from '../controllers/tipoController';
import { authenticateJWT, adminOnly } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', authenticateJWT, typeController.getAllTypes);
router.get('/:id', authenticateJWT, typeController.getTypeById);
router.post('/', authenticateJWT, adminOnly, typeController.createType);
router.put('/:id', authenticateJWT, adminOnly, typeController.updateType);
router.delete('/:id', authenticateJWT, adminOnly, typeController.deleteType);

export default router;