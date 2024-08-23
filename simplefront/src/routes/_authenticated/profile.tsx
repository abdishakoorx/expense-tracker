import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) return "not logged in";

  return (
    <>
      <p>Hello {data.user.family_name}</p>
      <div className="flex gap-2">
        <p>Logout</p>
        <a href="/api/logout" className="text-blue-600">
          here
        </a>
      </div>
    </>
  );
}
