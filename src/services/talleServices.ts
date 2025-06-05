import { PrismaClient, Talle } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllTalles(): Promise<Talle[]> {
  return prisma.talle.findMany({ where: { activo: true } });
}

export async function getTalleById(id: number): Promise<Talle | null> {
  return prisma.talle.findFirst({ where: { id, activo: true } });
}

export async function createTalle(data: { idTipo: number }): Promise<Talle> {
  return prisma.talle.create({ data: { ...data, activo: true } as any });
}

export async function updateTalle(id: number, data: { idTipo?: number }): Promise<Talle> {
  return prisma.talle.update({
    where: { id },
    data,
  });
}

export async function deleteTalle(id: number): Promise<Talle> {
  // Delete lógico: poner activo en false
  return prisma.talle.update({
    where: { id },
    data: { activo: false } as any,
  });
}