import { PrismaClient, Categoria } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllCategorias(): Promise<Categoria[]> {
  return prisma.categoria.findMany();
}

export async function getCategoriaById(id: number): Promise<Categoria | null> {
  return prisma.categoria.findUnique({ where: { id } });
}

export async function createCategoria(data: Omit<Categoria, 'id' | 'createdAt' | 'updatedAt'>): Promise<Categoria> {
  return prisma.categoria.create({ data });
}

export async function updateCategoria(id: number, data: Partial<Omit<Categoria, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Categoria> {
  return prisma.categoria.update({
    where: { id },
    data,
  });
}

export async function deleteCategoria(id: number): Promise<Categoria> {
  return prisma.categoria.delete({ where: { id } });
}