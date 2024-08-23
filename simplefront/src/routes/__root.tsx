import { ModeToggle } from "@/(components)/mode-toggle";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Navbar() {
  return (
    <div className="flex items-center justify-between px-10 py-3">
      <div className="flex items-center gap-14 ">
        <Link
          to="/"
          className="[&.active]:font-bold [&.active]:rounded-full [&.active]:bg-gradient-to-tr [&.active]:from-orange-400 [&.active]:to-orange-100 [&.active]:p-3 [&.active]:text-gray-800"
        >
          Home
        </Link>{" "}
        <Link
          to="/expenses"
          className="[&.active]:font-bold [&.active]:bg-gradient-to-tr [&.active]:from-orange-400 [&.active]:to-orange-100 [&.active]:rounded-full [&.active]:p-3 [&.active]:text-gray-800"
        >
          Expenses
        </Link>
        <Link
          to="/create"
          className="[&.active]:font-bold [&.active]:bg-gradient-to-tr [&.active]:from-orange-400 [&.active]:to-orange-100 [&.active]:rounded-full [&.active]:p-3 [&.active]:text-gray-800"
        >
          Create
        </Link>
        <Link
          to="/profile"
          className="[&.active]:font-bold [&.active]:bg-gradient-to-tr [&.active]:from-orange-400 [&.active]:to-orange-100 [&.active]:rounded-full [&.active]:p-3 [&.active]:text-gray-800"
        >
          Profile
        </Link>
        <Link
          to="/about"
          className="[&.active]:font-bold [&.active]:bg-gradient-to-tr [&.active]:from-orange-400 [&.active]:to-orange-100 [&.active]:rounded-full [&.active]:p-3 [&.active]:text-gray-800"
        >
          About
        </Link>
      </div>

      <ModeToggle />
    </div>
  );
}

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
