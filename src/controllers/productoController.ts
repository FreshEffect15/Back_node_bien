import { Request, Response } from 'express';
import * as productoService from '../services/productoService';

export async function getAllProductos(req: Request, res: Response) {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
}

export async function getProductoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const producto = await productoService.getProductoById(id);
    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
}


export async function createProducto(req: Request, res: Response) {
  try {
    const data = req.body;
    const productoCreado = await productoService.createProducto(data);
    res.status(201).json(productoCreado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
}

export async function updateProducto(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const productoActualizado = await productoService.updateProducto(id, data);
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
}

export async function deleteProducto(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const productoEliminado = await productoService.deleteProducto(id);
    res.json({ message: 'Producto eliminado', productoEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
}