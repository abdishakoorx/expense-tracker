import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { CubeIcon } from "@radix-ui/react-icons";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/create")({
  component: Create,
});

function Create() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const resp = await api.expenses.$post({json: value});
      if (!resp.ok){
        throw new Error("Failed to create expense");
      }
      toast("Expense created");
      navigate({to: "/expenses"});
      
    },
  });

  return (
    <div className="px-10 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="title"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="amount"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant={"outline"}
              className="bg-accent"
              disabled={!canSubmit}
            >
              {isSubmitting ? <CubeIcon className="animate-spin" /> : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
