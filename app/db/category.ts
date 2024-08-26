import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (title: string) => {
  return await prisma.category.create({
    data: {
      title: title,
    },
  });
};

export const getAllCategory = async () => {
  return await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
};

export const removeCategory = async (id: number) => {
  try {
    // Cek apakah category dengan id yang diberikan ada
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error(`Category with ID ${id} not found`);
    }

    // Menghapus category jika ditemukan
    return await prisma.category.delete({ where: { id } });
  } catch (error) {
    console.error("Error removing category:", error);
    throw new Error(`Failed to remove category`);
  }
};
