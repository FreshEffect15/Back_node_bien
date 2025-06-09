import { Router } from 'express';
import * as categoriaController from '../controllers/categoriaController';
import { authenticateJWT, adminOnly } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', authenticateJWT, categoriaController.getAllCategorias);
router.get('/:id', authenticateJWT, categoriaController.getCategoriaById);
router.post('/', authenticateJWT, adminOnly, categoriaController.createCategoria);
router.put('/:id', authenticateJWT, adminOnly, categoriaController.updateCategoria);
router.delete('/:id', authenticateJWT, adminOnly, categoriaController.deleteCategoria);

export default router;