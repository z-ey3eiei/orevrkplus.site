import { createFileRoute } from "@tanstack/react-router";
import InstallCommand from "@/components/home/InstallCommand";
import createOvkApp from "@/lib/create-ovk-app.meta";

function CreateOvkAppPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Official CLI</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">create-ovk-app</h1>
      <p className="mt-5 leading-7 text-muted-foreground">{createOvkApp.description}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        npm package <code className="text-xs">{createOvkApp.packageName}</code> · Node {createOvkApp.nodeEngine} ·{" "}
        <a href={createOvkApp.repository} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
          source on GitHub
        </a>
      </p>

      <div className="mt-8 max-w-lg">
        <InstallCommand />
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Usage</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Run with a target directory name. Help: <code className="text-xs">{createOvkApp.npmInvoke} --help</code> (or{" "}
        <code className="text-xs">-h</code>). If you omit the directory, the CLI defaults to{" "}
        <code className="text-xs">{createOvkApp.defaultProjectName}</code>.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs leading-7">
        <code>{`${createOvkApp.scaffoldCommand}
${createOvkApp.afterScaffold.join("\n")}`}</code>
      </pre>

      <h2 className="mt-12 text-2xl font-semibold">Project scripts</h2>
      <p className="mt-3 text-sm text-muted-foreground">Commands available in the generated app (from the CLI README).</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-semibold">Command</th>
              <th className="px-4 py-3 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody>
            {createOvkApp.projectScripts.map((row) => (
              <tr key={row.command} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{row.command}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Deploy anywhere</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        After <code className="text-xs">npm run build</code>, upload <code className="text-xs">dist/</code> or use{" "}
        <code className="text-xs">npm run export</code>. Static hosts often ask for build command{" "}
        <code className="text-xs">{createOvkApp.hostBuildHint.buildCommand}</code> and output{" "}
        <code className="text-xs">{createOvkApp.hostBuildHint.outputDirectory}</code>.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {createOvkApp.deployExamples.map((row) => (
          <li key={row.host}>
            <span className="font-medium text-foreground">{row.host}:</span>{" "}
            <code className="text-xs">{row.command}</code>
          </li>
        ))}
        <li>GitHub Pages: push dist/ contents to the gh-pages branch and enable Pages.</li>
        <li>S3, R2, or general static hosting: upload the dist/ folder.</li>
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">When to use</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
        <li>You want the OREVRK PLUS Vite starter (edit src/main.js and src/style.css, output dist/).</li>
        <li>You need port 3000 dev and port 4173 preview, not this TanStack Start deployment.</li>
      </ul>
    </div>
  );
}

export const Route = createFileRoute("/create-ovk-app")({
  component: CreateOvkAppPage,
  head: () => ({
    meta: [
      { title: "create-ovk-app — orevrkplus" },
      { name: "description", content: createOvkApp.description },
    ],
    links: [
      { rel: "alternate", type: "text/markdown", href: "/create-ovk-app.md" },
      { rel: "describedby", href: "/llms.txt" },
    ],
  }),
});
