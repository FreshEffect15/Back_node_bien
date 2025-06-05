import { Request, Response } from 'express';
import * as talleService from '../services/talleServices';

export async function getAllTalles(req: Request, res: Response) {
  try {
    const talles = await talleService.getAllTalles();
    res.json(talles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener talles', error });
  }
}

export async function getTalleById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const talle = await talleService.getTalleById(id);
    if (!talle) {
      res.status(404).json({ message: 'Talle no encontrado' });
      return;
    }
    res.json(talle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener talle', error });
  }
}

export async function createTalle(req: Request, res: Response) {
  try {
    const { idTipo } = req.body;
    if (!idTipo) {
      res.status(400).json({ message: 'El campo idTipo es requerido' });
      return;
    }
    const talleCreado = await talleService.createTalle({ idTipo });
    res.status(201).json(talleCreado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear talle', error });
  }
}

export async function updateTalle(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { idTipo } = req.body;
    const talleActualizado = await talleService.updateTalle(id, { idTipo });
    res.json(talleActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar talle', error });
  }
}

export async function deleteTalle(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const talleEliminado = await talleService.deleteTalle(id);
    res.json({ message: 'Talle eliminado', talleEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar talle', error });
  }
}