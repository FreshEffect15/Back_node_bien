import { Request, Response } from 'express';
import * as categoriaService from '../services/categoriaServices';

export async function getAllCategorias(req: Request, res: Response) {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error });
  }
}

export async function getCategoriaById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const categoria = await categoriaService.getCategoriaById(id);
    if (!categoria) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoría', error });
  }
}


export async function createCategoria(req: Request, res: Response) {
  try {
    const data = req.body;
    const categoriaCreada = await categoriaService.createCategoria(data);
    res.status(201).json(categoriaCreada);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error });
  }
}

export async function updateCategoria(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const categoriaActualizada = await categoriaService.updateCategoria(id, data);
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría', error });
  }
}

export async function deleteCategoria(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const categoriaEliminada = await categoriaService.deleteCategoria(id);
    res.json({ message: 'Categoría eliminada', categoriaEliminada });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error });
  }
}