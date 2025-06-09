import { PrismaClient, Categoria } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllCategorias(): Promise<Categoria[]> {
  return prisma.categoria.findMany({
    where: { activo: true },
    include: {
      tipo: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  });
}

export async function getCategoriaById(id: number): Promise<Categoria | null> {
  return prisma.categoria.findFirst({
    where: { id, activo: true },
    include: {
      tipo: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  });
}

export async function createCategoria(data: Omit<Categoria, 'id' | 'createdAt' | 'updatedAt' | 'activo'>): Promise<Categoria> {
  return prisma.categoria.create({ data: { ...data, activo: true } as any });
}

export async function updateCategoria(
  id: number,
  data: Partial<Omit<Categoria, 'id' | 'createdAt' | 'updatedAt' | 'activo'>>
): Promise<Categoria> {
  const { activo, ...rest } = data as any;
  return prisma.categoria.update({
    where: { id },
    data: rest,
  });
}

export async function deleteCategoria(id: number): Promise<Categoria> {
  return prisma.categoria.update({
    where: { id },
    data: { activo: false } as any,
  });
}