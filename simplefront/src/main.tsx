import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Toaster } from "./components/ui/sonner.tsx";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();
// Create a new router instance
const router = createRouter({ routeTree, context: {queryClient} });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        {" "}
        <RouterProvider router={router} />{" "}
      </QueryClientProvider>
    </ThemeProvider>
    <Toaster richColors />
  </StrictMode>
);
