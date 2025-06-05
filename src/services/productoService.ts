import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getAllProductos = async () => {
  return prisma.producto.findMany({ where: { activo: true } });
};

export const getProductoById = async (id: number) => {
  return prisma.producto.findFirst({ where: { id, activo: true } });
};

export const createProducto = async (data: any) => {
  return prisma.producto.create({ data: { ...data, activo: true } as any });
};

export const updateProducto = async (id: number, data: any) => {
  // No permitir actualizar el campo activo desde aquí
  const { activo, ...rest } = data;
  return prisma.producto.update({ where: { id }, data: rest });
};

export const deleteProducto = async (id: number) => {
  // Delete lógico: poner activo en false
  return prisma.producto.update({ where: { id }, data: { activo: false } as any });
};
