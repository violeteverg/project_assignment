import { z } from "zod";

export type CreateExpense = {
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: Date;
};

export interface UpdateExpense {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const createExpenseSchema = z.object({
  categoryId: z.number(),
  amount: z.number(),
  description: z.string(),
  date: z.date(),
});

export type TCreateExpenseSchema = z.infer<typeof createExpenseSchema>;
