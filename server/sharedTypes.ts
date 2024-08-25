import { z } from "zod";

export const expenseShema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(80, { message: "Title must be at most 80 characters" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a positive number.",
    }),
});

export const createPostSchema = expenseShema.omit({ id: true });
