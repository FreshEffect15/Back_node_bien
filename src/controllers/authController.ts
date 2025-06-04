import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import { PrismaClient, Usuario } from '../generated/prisma';

import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioServices';

const prisma = new PrismaClient();
export async function register(req: Request, res: Response) {
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

export async function login(req: Request, res: Response) {
  try {
    const { token, usuario } = await authService.login(req.body);
    res.json({ token, usuario });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
