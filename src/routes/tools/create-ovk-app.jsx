import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/create-ovk-app")({
  beforeLoad: () => {
    throw redirect({ to: "/create-ovk-app" });
  },
});
