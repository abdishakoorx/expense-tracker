import { Button } from "@/components/ui/button";
import { deleteExpense, fetchAllExpensesOptions } from "@/lib/api";
import { CubeIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DeleteExpense({ id }: { id: number }) {
  const queryclient = useQueryClient();
  const deletion = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      // An error happened!
      toast.error("Error", {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      // Boom baby!
      toast.success("Expense Deleted", {
        description: `Successfully delete expense: ${id}`,
      });

      queryclient.setQueryData(fetchAllExpensesOptions.queryKey, (existingExpenses) => ({
        ...existingExpenses,
        expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
      }));
    },
  });
  return (
    <Button
      disabled={deletion.isPending}
      variant="destructive"
      size="icon"
      onClick={() => deletion.mutate({ id })}
    >
      {deletion.isPending ? (
        <CubeIcon className="animate-spin" />
      ) : (
        <TrashIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
