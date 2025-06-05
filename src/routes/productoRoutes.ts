// src/routes/productoRoutes.ts
import { Router } from 'express';
import productoController from '../controllers/productoController';

const router = Router();

router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById); // <- aquí era el error
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

export default router;
