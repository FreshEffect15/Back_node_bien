import { Router } from 'express';
import * as productoController from '../controllers/productoController';
import { authenticateJWT, adminOnly } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', authenticateJWT, productoController.getAllProductos);
router.get('/:id', authenticateJWT, productoController.getProductoById);
router.post('/', authenticateJWT, adminOnly, productoController.createProducto);
router.put('/:id', authenticateJWT, adminOnly, productoController.updateProducto);
router.delete('/:id', authenticateJWT, adminOnly, productoController.deleteProducto);

export default router;