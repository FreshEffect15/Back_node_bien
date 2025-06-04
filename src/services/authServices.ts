import { PrismaClient } from '../generated/prisma'; // o usa '@prisma/client' si no estás generando en ruta personalizada
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';
const JWT_EXPIRES_IN = '1h';
const SALT_ROUNDS = 10;

interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export async function register({ email, password, nombre }: RegisterRequest) {
  const existingUser = await prisma.usuario.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await prisma.usuario.create({
    data: {
      email,
      contrasenia: hashedPassword,
      nombre,
      rol: 'CLIENT',
    },
  });

  // Oculta la contraseña antes de devolver el objeto
  const { contrasenia, ...userWithoutPass } = newUser;
  return userWithoutPass;
}

export async function login({ email, password }: LoginRequest) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const validPassword = await bcrypt.compare(password, usuario.contrasenia);
  if (!validPassword) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const { contrasenia, ...userWithoutPass } = usuario;

  return { token, usuario: userWithoutPass };
}
