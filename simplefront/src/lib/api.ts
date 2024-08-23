import { hc } from 'hono/client'
import { type ApiRoutes } from "../../../server/app.ts";
import { queryOptions } from '@tanstack/react-query';

const client = hc<ApiRoutes>('/')

export const api = client.api

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