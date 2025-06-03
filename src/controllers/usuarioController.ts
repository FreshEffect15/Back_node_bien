import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioService';

export async function getAllUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
}

export async function getUsuarioById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
}



export async function createUsuario(req: Request, res: Response) {
  try {
    const data = req.body;
    // Hashear la contraseña antes de crear el usuario
    if (data.password) {
      const SALT_ROUNDS = 10;
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }
    const usuarioCreado = await usuarioService.createUsuario(data);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
}


export async function updateUsuario(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const usuarioActualizado = await usuarioService.updateUsuario(id, data);
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
}

export async function deleteUsuario(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const usuarioEliminado = await usuarioService.deleteUsuario(id);
    res.json({ message: 'Usuario eliminado', usuarioEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
}
