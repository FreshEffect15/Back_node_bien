import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getAllProductos = async () => {
  return prisma.producto.findMany();
};

export const getProductoById = async (id: number) => {
  return prisma.producto.findUnique({ where: { id } });
};

export const createProducto = async (data: any) => {
  return prisma.producto.create({ data });
};

export const updateProducto = async (id: number, data: any) => {
  return prisma.producto.update({ where: { id }, data });
};

export const deleteProducto = async (id: number) => {
  return prisma.producto.delete({ where: { id } });
};
