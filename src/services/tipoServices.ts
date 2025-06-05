import { PrismaClient, Tipo } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllTypes(): Promise<Tipo[]> {
  return prisma.tipo.findMany();
}

export async function getTypeById(id: number): Promise<Tipo | null> {
  return prisma.tipo.findUnique({ where: { id } });
}

export async function createType(data: { nombre: string }): Promise<Tipo> {
  return prisma.tipo.create({ data });
}

export async function updateType(id: number, data: { nombre?: string }): Promise<Tipo> {
  return prisma.tipo.update({
    where: { id },
    data,
  });
}

export async function deleteType(id: number): Promise<Tipo> {
  return prisma.tipo.delete({ where: { id } });
}