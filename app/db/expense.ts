import { PrismaClient } from "@prisma/client";
import { CreateExpense, UpdateExpense } from "../utils/schemas/expenseSchema";

const prisma = new PrismaClient();

// create expense
export const createExpense = async (data: CreateExpense) => {
  return await prisma.expense.create({
    data,
  });
};
// get all expense
export const findAllExpense = async (userId: number) => {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: {
      id: "desc",
    },
  });
};
// get by id expense
export const findByIdExpense = async (id: number) => {
  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  if (!expense) {
    throw new Error(`Expense with ID ${id} not found.`);
  }

  return expense;
};
// update expense
export const updateExpense = async (
  id: number,
  data: Partial<UpdateExpense>
) => {
  return await prisma.expense.update({
    where: { id },
    data,
  });
};
// remove expense
export const deleteExpense = async (id: number) => {
  return await prisma.expense.delete({ where: { id } });
};
