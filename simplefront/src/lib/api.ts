import { hc } from "hono/client";
import { type ApiRoutes } from "../../../server/app.ts";
import { queryOptions } from "@tanstack/react-query";
import { type createPostExpense } from "../../../server/sharedTypes.ts";
import { toast } from "sonner";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const resp = await api.me.$get();
  if (!resp.ok) {
    throw new Error("Failed to fetch user");
  }
  const data = await resp.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export async function fetchAllExpenses() {
  const resp = await api.expenses.$get();
  if (!resp.ok) {
    throw new Error("Failed to fetch total");
  }
  const data = await resp.json();
  return data;
}

export const fetchAllExpensesOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: fetchAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export async function createExpense({ value }: { value: createPostExpense }) {
  const resp = await api.expenses.$post({ json: value });
  if (!resp.ok) {
    toast.error("Failed to create expense");
  }
  const newExpense = await resp.json();
  return newExpense;
}

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: createPostExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
  const resp = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if(!resp.ok){
    throw new Error("Server Error")
  }
}
