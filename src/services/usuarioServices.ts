import { PrismaClient, Usuario } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllUsuarios(): Promise<Usuario[]> {
  // Solo usuarios activos
  return prisma.usuario.findMany({ where: { activo: true } });
}

export async function getUsuarioById(id: number): Promise<Usuario | null> {
  // Solo si está activo
  return prisma.usuario.findFirst({ where: { id, activo: true } });
}

export async function createUsuario(data: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'activo'>): Promise<Usuario> {
  // Por defecto activo en true
  return prisma.usuario.create({ data: { ...data, activo: true } as any });
}

export async function updateUsuario(
  id: number,
  data: Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'activo'>>
): Promise<Usuario> {
  // No permitir actualizar el campo activo desde aquí
  const { activo, ...rest } = data as any;
  return prisma.usuario.update({
    where: { id },
    data: rest,
  });
}

export async function deleteUsuario(id: number): Promise<Usuario> {
  // Delete lógico: poner activo en false
  return prisma.usuario.update({
    where: { id },
    data: { activo: false } as any,
  });
}
