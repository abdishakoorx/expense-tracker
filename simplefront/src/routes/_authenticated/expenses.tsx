import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

async function fetchAllExpenses() {
  const resp = await api.expenses.$get();
  if (!resp.ok) {
    throw new Error("Failed to fetch total");
  }
  const data = await resp.json();
  return data;
}

function Expenses() {
  // Queries
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: fetchAllExpenses,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  let totalAmount = 0;

  return (
    <>
      <div className="px-10 py-4">
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          {isPending ? (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableBody>
              {data?.expenses.map((expense) => {
                totalAmount += Number(expense.amount);
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell className="text-right">
                      {expense.date}
                    </TableCell>
                    <TableCell className="text-right">
                      {expense.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$ {totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
