import { Router } from 'express';
import * as talleController from '../controllers/talleController';
import { authenticateJWT } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', talleController.getAllTalles);
router.get('/:id', talleController.getTalleById);
router.post('/', authenticateJWT, talleController.createTalle);
router.put('/:id', authenticateJWT, talleController.updateTalle);
router.delete('/:id', authenticateJWT, talleController.deleteTalle);

export default router;