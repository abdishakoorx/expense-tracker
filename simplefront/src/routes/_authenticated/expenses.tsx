import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  fetchAllExpensesOptions,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteExpense from "@/(components)/DeleteExpense";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  // Queries
  const { isPending, error, data } = useQuery(fetchAllExpensesOptions);

  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="h-8" />
              </TableCell>
              <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
              <TableCell className="text-right">
                {loadingCreateExpense?.expense.date}
              </TableCell>
              <TableCell className="text-right">
                {loadingCreateExpense?.expense.amount}
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-8" />
              </TableCell>
            </TableRow>
          )}
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
                  <TableCell className="text-right">
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableBody>
              {data?.expenses.map((expense) => {
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell className="text-right">{expense.date}</TableCell>
                    <TableCell className="text-right">
                      {expense.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <DeleteExpense id={expense.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </>
  );
}
