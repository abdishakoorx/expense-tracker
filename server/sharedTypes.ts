import type { z } from "zod";
import { insertExpensesSchema } from "./db/schema/expenses";

export const createPostSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
  id:true,
});

export type createPostExpense = z.infer<typeof createPostSchema>;
