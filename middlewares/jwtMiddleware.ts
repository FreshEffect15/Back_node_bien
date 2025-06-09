import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface JwtPayload {
  id: number;
  email: string;
  rol: string;
  iat: number;
  exp: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No autorizado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
}

export function adminOnly(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.rol !== 'ADMIN') {
    res.status(403).json({ message: 'Solo el administrador puede acceder a este recurso.' });
    return;
  }
  next();
}
