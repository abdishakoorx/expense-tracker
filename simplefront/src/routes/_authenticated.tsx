import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";

const login = () => {
  return (
    <div className="flex gap-2">
      <p>Login</p>
      <a href="/api/login" className="text-blue-600"> here</a>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return login();
  }

  return <Outlet />;
};
// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return { user: null };
    }
  },

  component: Component,
});
