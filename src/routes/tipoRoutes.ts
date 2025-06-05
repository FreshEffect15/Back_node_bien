import { Router } from 'express';
import * as typeController from '../controllers/tipoController';
import { authenticateJWT } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', typeController.getAllTypes);
router.get('/:id', typeController.getTypeById);
router.post('/', authenticateJWT, typeController.createType);
router.put('/:id', authenticateJWT, typeController.updateType);
router.delete('/:id', authenticateJWT, typeController.deleteType);

export default router;