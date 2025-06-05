import { PrismaClient, Talle } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllTalles(): Promise<Talle[]> {
  return prisma.talle.findMany();
}

export async function getTalleById(id: number): Promise<Talle | null> {
  return prisma.talle.findUnique({ where: { id } });
}

export async function createTalle(data: { idTipo: number }): Promise<Talle> {
  return prisma.talle.create({ data });
}

export async function updateTalle(id: number, data: { idTipo?: number }): Promise<Talle> {
  return prisma.talle.update({
    where: { id },
    data,
  });
}

export async function deleteTalle(id: number): Promise<Talle> {
  return prisma.talle.delete({ where: { id } });
}