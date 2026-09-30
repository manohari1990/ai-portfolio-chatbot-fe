import { Bot, Briefcase, LayoutDashboard, LogOut, MessagesSquare, Settings, Users2, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

// import { StoredAvatar } from "@/components/console/file-url";
// import { RoleBadge } from "@/components/console/PageParts";
import { Button } from "../ui/button";
// import { login, user } from "@/hooks/useAuth";
import { cn } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { StoredAvatar } from "./FileUrl";

const navGroups = [
  {
    label: "Manage",
    items: [
      { to: "/dashboard", label: "Overview", icon: LayoutDashboard, adminOnly: false },
      { to: "/users", label: "Users", icon: Users2, adminOnly: true },
      { to: "/portfolios", label: "Portfolios", icon: Briefcase, adminOnly: false },
    ],
  },
  {
    label: "Chatbot",
    items: [
      { to: "/chatbot", label: "Configuration", icon: Bot, adminOnly: false },
      { to: "/conversations", label: "Conversations", icon: MessagesSquare, adminOnly: false },
      { to: "/visitors", label: "Visitors", icon: UsersRound, adminOnly: false },
    ],
  },
] as const;

export function Shell({
  breadcrumb,
  children,
}: {
  breadcrumb: { label: string; to?: string }[];
  children: ReactNode;
}) {
//   const { isAdmin, role } = useRole();
//   const { data: profile } = useProfile();
  const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const pathname = useRouterState({ select: (s) => s.location.pathname });

//   async function handleSignOut() {
//     await queryClient.cancelQueries();
//     queryClient.clear();
//     await supabase.auth.signOut();
//     navigate({ to: "/auth", replace: true });
//   }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="orb -top-24 -left-24 size-[420px] bg-primary/25"
          style={{ animation: "drift 18s ease-in-out infinite" }}
        />
        <div
          className="orb top-1/3 right-0 size-[380px] bg-accent/20"
          style={{ animation: "drift2 22s ease-in-out infinite" }}
        />
        <div
          className="orb bottom-0 left-1/3 size-[300px] bg-fuchsia-400/15"
          style={{ animation: "drift 26s ease-in-out infinite" }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-white/55 backdrop-blur-2xl md:flex">
          <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
              C
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-semibold">Candify</p>
              <p className="text-[11px] text-muted-foreground">Admin Console</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="data-label px-3 pt-3 pb-1 tracking-[0.14em]">{group.label}</p>
                {group.items
                //   .filter((item) => !item.adminOnly || isAdmin)
                  .map((item) => { 
                    const active = false;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                          active
                            ? "bg-primary/10 font-medium text-primary ring-1 ring-primary/20"
                            : "text-secondary-foreground hover:bg-white/70",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
              </div>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-lg bg-white/60 px-2 py-2 ring-1 ring-border hover:bg-white/80"
            >
              <StoredAvatar path={''} name={'Manohari'} className="size-8" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium">{'Manohari'}</p>
                <p className="truncate text-[11px] text-muted-foreground capitalize">{'Admin'}</p>
              </div>
              <Settings className="ml-auto size-4 text-muted-foreground" />
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center gap-4 border-b border-border bg-white/40 px-6 backdrop-blur-xl">
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              {breadcrumb.map((crumb, index) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? <span className="text-border">/</span> : null}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-foreground">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="truncate font-medium text-foreground">{crumb.label}</span>
                  )}
                </span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-3">
              {/* <RoleBadge role={role} /> */}
              <Button variant="ghost" size="sm" onClick={()=> {}}>
                <LogOut className="size-4" /> Sign out
              </Button>
            </div>
          </header>

          <div className="space-y-6 p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
