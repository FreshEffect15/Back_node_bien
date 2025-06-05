import { PrismaClient, Tipo } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllTypes(): Promise<Tipo[]> {
  return prisma.tipo.findMany({ where: { activo: true } });
}

export async function getTypeById(id: number): Promise<Tipo | null> {
  return prisma.tipo.findFirst({ where: { id, activo: true } });
}

export async function createType(data: { nombre: string }): Promise<Tipo> {
  return prisma.tipo.create({ data: { ...data, activo: true } as any });
}

export async function updateType(id: number, data: { nombre?: string }): Promise<Tipo> {
  return prisma.tipo.update({
    where: { id },
    data,
  });
}

export async function deleteType(id: number): Promise<Tipo> {
  // Delete lógico: poner activo en false
  return prisma.tipo.update({
    where: { id },
    data: { activo: false } as any,
  });
}