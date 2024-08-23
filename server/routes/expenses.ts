import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseShema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(80),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseShema>;

const createPostSchema = expenseShema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Groceries",
    amount: "50",
  },
  {
    id: 2,
    title: "Utilities",
    amount: "100",
  },
  {
    id: 3,
    title: "Rent",
    amount: "1000",
  },
];

export const expenseRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    return c.json({ expenses: expenses });
  })

  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const user = c.var.user;
    const expense = await c.req.valid("json");
    console.log("Received expense data:", expense);
    const result = await db.insert(expensesTable).values({
      ...expense,
      userId: user.id,
    });
    c.status(201);
    return c.json(result);
  })

  .get("/total", getUser, (c) => {
    // testing the loading state in the frontend
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + +expense.amount,
      0
    );
    return c.json({ total });
  })

  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })

  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const expenseDelete = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: expenseDelete });
  });
//   .put
