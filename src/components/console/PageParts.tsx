import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string | undefined;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="max-w-[40ch] text-2xl font-semibold tracking-tight text-balance">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-pretty text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string | number;
  hint?: string | undefined;
  tone?: "default" | "positive" | undefined;
}) {
  return (
    <div className="panel p-4">
      <p className="data-label">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {hint ? (
        <p className={cn("mt-1 text-xs", tone === "positive" ? "text-success" : "text-muted-foreground")}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string | undefined }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm font-medium">{title}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function StatusDot({ status }: { status?: string | null | undefined }) {
  const map: Record<string, string> = {
    active: "bg-success text-success",
    published: "bg-success text-success",
    open: "bg-success text-success",
    new: "bg-accent text-accent",
    draft: "bg-warning text-warning",
    idle: "bg-warning text-warning",
    pending: "bg-warning text-warning",
  };
  const cls = map[status ?? ""] ?? "bg-muted-foreground text-muted-foreground";
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs capitalize", cls.split(" ")[1])}>
      <span className={cn("size-1.5 rounded-full", cls.split(" ")[0])} />
      {status ?? "unknown"}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-xs font-medium capitalize",
        role === "admin"
          ? "bg-primary/10 text-primary ring-1 ring-primary/20"
          : "bg-muted text-muted-foreground ring-1 ring-border",
      )}
    >
      {role}
    </span>
  );
}
