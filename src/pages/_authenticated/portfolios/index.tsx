import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// import { sanitize } from "@/components/console/crud-section";
import { EmptyState, PageHeader, StatusDot } from "../../../components/console/PageParts";
import { RecordForm, type FieldDef, type RecordValues } from "../../../components/console/RecordForm";
import { Shell } from "../../../components/console/Shell";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../hooks/useAuth"
import { GetAllPortfolios } from "../../../services/PortfolioService";


export default function Portfolios() {
  const { user } = useAuth();
  const profile = user ? JSON.parse(user) : {}
  const { isAdmin } = true//useRole();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<RecordValues | null>(null);

    // const ownerName = useMemo(() => {
    //   const map = new Map(owners.map((o: any) => [o.id, o.full_name ?? o.email ?? o.id]));
    //   return (id: string) => map.get(id) ?? "—";
    // }, [owners]);

  const fields: FieldDef[] = useMemo(() => {
    const base: FieldDef[] = [
      { name: "title", label: "Portfolio title", required: true, placeholder: "Frontend Engineering", full: false },
      { name: "specialization", label: "Specialization", placeholder: "Design systems", full: false },
      { name: "headline", label: "Headline", placeholder: "Senior Frontend Engineer" },
      { name: "years_experience", label: "Years of experience", type: "number", full: false },
      {
        name: "status",
        label: "Status",
        type: "select",
        full: false,
        options: [
          { value: "draft", label: "Draft" },
          { value: "published", label: "Published" },
        ],
      },
      { name: "summary", label: "Summary", type: "textarea", placeholder: "Short professional summary…" },
      { name: "cover_image_url", label: "Cover image", type: "image", folder: "portfolio-covers", accept: "image/*" },
      { name: "resume_url", label: "Resume / CV", type: "file", folder: "resumes", accept: ".pdf,.doc,.docx" },
    ];
    // if (isAdmin) {
    //   base.unshift({
    //     name: "user_id",
    //     label: "Owner",
    //     type: "select",
    //     options: owners.map((o: any) => ({ value: o.id, label: o.full_name ?? o.email ?? o.id })),
    //   });
    // }
    return base;
  }, [isAdmin]);
  //   }, [isAdmin, owners]);

  //   const save = useMutation({
  //     mutationFn: async (values: RecordValues) => {
  //       const payload = sanitize(values, fields);
  //       if (!payload["status"]) payload["status"] = "draft";
  //       if (editing) {
  //         const { error } = await supabase
  //           .from("portfolios")
  //           .update(payload as never)
  //           .eq("id", editing["id"] as string);
  //         if (error) throw error;
  //       } else {
  //         const { error } = await supabase
  //           .from("portfolios")
  //           .insert({ ...payload, user_id: (payload["user_id"] as string) || user!.id } as never);
  //         if (error) throw error;
  //       }
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["portfolios"] });
  //       setOpen(false);
  //       setEditing(null);
  //       toast.success("Portfolio saved");
  //     },
  //     onError: (error: Error) => toast.error(error.message),
  //   });

  //   const remove = useMutation({
  //     mutationFn: async (id: string) => {
  //       const { error } = await supabase.from("portfolios").delete().eq("id", id);
  //       if (error) throw error;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["portfolios"] });
  //       toast.success("Portfolio deleted");
  //     },
  //     onError: (error: Error) => toast.error(error.message),
  //   });

  const { status, data, error, isLoading } = useQuery({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const data = await GetAllPortfolios(profile.user_id)
      toast.success("Portfolio fetched!");
      return data.data
    }
  })
  return (
    <Shell breadcrumb={[{ label: "Dashboard", to: "/dashboard" }, { label: "Portfolios" }]}>
      <PageHeader
        title="Portfolios"
        description={
          isAdmin
            ? "Every portfolio in the workspace. Open one to manage its skills, projects, experience and certifications."
            : "Your portfolios. Open one to manage its skills, projects, experience and certifications."
        }
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="size-4" /> New portfolio
          </Button>
        }
      />

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-medium">
            All portfolios <span className="font-normal text-muted-foreground">· {1}</span>
          </p>
        </div>

        {isLoading ? (
          <EmptyState title="Loading…" />
        ) : data.length === 0 ? (
          <EmptyState title="No portfolios yet" hint="Create your first portfolio to start adding records." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="data-label px-4 py-2.5 font-medium">Portfolio</th>
                  {isAdmin ? <th className="data-label px-4 py-2.5 font-medium">Owner</th> : null}
                  <th className="data-label px-4 py-2.5 font-medium">Description</th>
                  <th className="data-label px-4 py-2.5 font-medium">Status</th>
                  <th className="data-label px-4 py-2.5 font-medium">Updated</th>
                  <th className="data-label px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((row: any) => (
                  <tr key={row.portfolio_id} className="hover:bg-white/60">
                    <td className="px-4 py-3">
                      <Link
                        to="/portfolios/$portfolioId"
                        params={{ portfolioId: row.portfolio_id }}
                        className="font-medium hover:text-primary"
                      >
                        {row.portfolio_name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{row.user.first_name ? `${row.user.first_name} ${row.user.last_name}` : "—"}</p>
                    </td>
                    {isAdmin ? (
                      <td className="px-4 py-3 text-muted-foreground">{String(row.user.first_name ?? "")}</td>
                    ) : null}
                    <td className="px-4 py-3 text-muted-foreground">{row.description ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusDot status={row.is_active} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(row.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit portfolio"
                          onClick={() => {
                            setEditing(row as unknown as RecordValues);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete portfolio"
                          className="text-destructive"
                          onClick={() => remove.mutate(row.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RecordForm
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit portfolio" : "New portfolio"}
        description="Portfolio details, cover image and resume."
        fields={fields}
        initial={editing}
        // submitting={save.isPending}
        // onSubmit={(values) => save.mutate(values)}
      />
    </Shell>
  );
}
