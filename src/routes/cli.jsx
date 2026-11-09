import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cli")({
  beforeLoad: () => {
    throw redirect({ to: "/create-ovk-app" });
  },
});
