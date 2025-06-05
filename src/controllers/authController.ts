// authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioServices';

const prisma = new PrismaClient();

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, nombre } = req.body;
    const missingFields = [];
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!nombre) missingFields.push('nombre');

    if (missingFields.length > 0) {
      res.status(400).json({ message: `Faltan campos requeridos: ${missingFields.join(', ')}` });
      return;
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const usuarioCreado = await usuarioService.createUsuario({
      email,
      contrasenia: hashedPassword,
      nombre,
      rol: 'CLIENT',
    });

    res.status(201).json(usuarioCreado);
  } catch (error) {
    console.error('Error en register:', error); // Muy útil para consola
res.status(500).json({ message: 'Error al crear usuario', error: error instanceof Error ? error.message : error });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, usuario } = await authService.login(req.body);
    res.json({ token, usuario });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export default {
  register,
  login,
};
