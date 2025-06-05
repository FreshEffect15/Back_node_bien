// src/controllers/productoController.ts
import * as productoService from '../services/productoService';
import { Request, Response } from 'express';

const getAllProductos = async (_req: Request, res: Response) => {
  const productos = await productoService.getAllProductos();
  res.json(productos);
};

const getProductoById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const producto = await productoService.getProductoById(id);
  if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(producto);
};

const createProducto = async (req: Request, res: Response) => {
  const producto = await productoService.createProducto(req.body);
  res.status(201).json(producto);
};

const updateProducto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const producto = await productoService.updateProducto(id, req.body);
    res.json(producto);
  } catch {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};

const deleteProducto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await productoService.deleteProducto(id);
    res.json({ message: 'Producto eliminado' });
  } catch {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};

export default {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
