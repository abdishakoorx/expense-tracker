import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})


async function fetchTotal() {
  const resp = await api.expenses["total"].$get();
  if (!resp.ok) {
    throw new Error("Failed to fetch total");
  }
  const data = await resp.json();
  return data;
}

function Index() {
  // Queries
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total"],
    queryFn: fetchTotal,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="mt-5 w-[400px] shadow-xl shadow-green-700">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>The total amount you've spent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="flex items-center justify-center text-xl">
             {isPending ? "loading..." : data.total}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
