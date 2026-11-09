import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/DocsRedirect")({
  beforeLoad: () => {
    throw redirect({ to: "/docs" });
  },
});
