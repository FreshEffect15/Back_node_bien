import { PrismaClient, Usuario } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllUsuarios(): Promise<Usuario[]> {
  return prisma.usuario.findMany();
}

export async function getUsuarioById(id: number): Promise<Usuario | null> {
  return prisma.usuario.findUnique({ where: { id } });
}

export async function createUsuario(data: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Usuario> {
  return prisma.usuario.create({ data });
}

export async function updateUsuario(id: number, data: Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Usuario> {
  return prisma.usuario.update({
    where: { id },
    data,
  });
}

export async function deleteUsuario(id: number): Promise<Usuario> {
  return prisma.usuario.delete({ where: { id } });
}
