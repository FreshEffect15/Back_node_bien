import { Router } from 'express';
import * as productoController from '../controllers/productoController';
import { authenticateJWT } from '../../middlewares/jwtMiddleware';

const router = Router();

router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.post('/', authenticateJWT, productoController.createProducto);
router.put('/:id', authenticateJWT, productoController.updateProducto);
router.delete('/:id', authenticateJWT, productoController.deleteProducto);

export default router;