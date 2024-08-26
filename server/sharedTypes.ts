import { insertExpensesSchema } from "./db/schema/expenses";

export const createPostSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
});
