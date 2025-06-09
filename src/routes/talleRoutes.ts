import { Router } from 'express';
import * as talleController from '../controllers/talleController';
import { authenticateJWT, adminOnly } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', authenticateJWT, talleController.getAllTalles);
router.get('/:id', authenticateJWT, talleController.getTalleById);
router.post('/', authenticateJWT, adminOnly, talleController.createTalle);
router.put('/:id', authenticateJWT, adminOnly, talleController.updateTalle);
router.delete('/:id', authenticateJWT, adminOnly, talleController.deleteTalle);

export default router;