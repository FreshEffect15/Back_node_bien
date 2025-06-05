import { Router } from 'express';
import * as categoriaController from '../controllers/categoriaController';
import { authenticateJWT } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.post('/', authenticateJWT, categoriaController.createCategoria);
router.put('/:id', authenticateJWT, categoriaController.updateCategoria);
router.delete('/:id', authenticateJWT, categoriaController.deleteCategoria);

export default router;