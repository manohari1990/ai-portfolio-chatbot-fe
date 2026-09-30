// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// import { sanitize } from "@/components/console/crud-section";
// import { StoredAvatar } from "@/components/console/file-url";
import { EmptyState, PageHeader, RoleBadge, StatusDot } from "../../components/console/PageParts";
import { RecordForm, type FieldDef, type RecordValues } from "../../components/console/RecordForm";
import { Shell } from "../../components/console/Shell";
import { Button } from "../../components/ui/button";
// import { useRole } from "../../hooks/useAuth";
// import { supabase } from "@/lib/mock-db";
// import { adminCreateUser, adminDeleteUser, adminSetRole } from "@/lib/mock-db";


const editFields: FieldDef[] = [
  { name: "full_name", label: "Full name", full: false },
  { name: "headline", label: "Headline", full: false },
  { name: "phone", label: "Phone", full: false },
  { name: "location", label: "Location", full: false },
  {
    name: "status",
    label: "Status",
    type: "select",
    full: false,
    options: [
      { value: "active", label: "Active" },
      { value: "idle", label: "Idle" },
      { value: "pending", label: "Pending" },
    ],
  },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "avatar_url", label: "Profile picture", type: "image", folder: "avatars", accept: "image/*" },
];

const createFields: FieldDef[] = [
  { name: "fullName", label: "Full name", required: true, full: false },
  { name: "email", label: "Email", required: true, full: false },
  { name: "password", label: "Temporary password", required: true, full: false },
  {
    name: "role",
    label: "Role",
    type: "select",
    full: false,
    options: [
      { value: "user", label: "User" },
      { value: "admin", label: "Admin" },
    ],
  },
];

export default function Users() {
//   const { isAdmin, loading } = useRole();
//   const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<RecordValues | null>(null);

//   const createUser = adminCreateUser;
//   const deleteUser = adminDeleteUser;
//   const setRole = adminSetRole;

//   const { data: rows = [] } = useQuery({
//     queryKey: ["users"],
//     enabled: isAdmin,
//     queryFn: async () => {
//       const [profiles, roles, portfolios] = await Promise.all([
//         supabase.from("profiles").select("*").order("created_at", { ascending: false }),
//         supabase.from("user_roles").select("user_id, role"),
//         supabase.from("portfolios").select("user_id"),
//       ]);
//       if (profiles.error) throw profiles.error;
//       const roleMap = new Map((roles.data ?? []).map((r: any) => [r.user_id, r.role]));
//       const counts = new Map<string, number>();
//       for (const p of portfolios.data ?? []) {
//         counts.set(p.user_id, (counts.get(p.user_id) ?? 0) + 1);
//       }
//       return (profiles.data ?? []).map((profile: any) => ({
//         ...profile,
//         role: roleMap.get(profile.id) ?? "user",
//         portfolioCount: counts.get(profile.id) ?? 0,
//       }));
//     },
//   });

//   const saveProfile = useMutation({
//     mutationFn: async (values: RecordValues) => {
//       const payload = sanitize(values, editFields);
//       const { error } = await supabase
//         .from("profiles")
//         .update(payload as never)
//         .eq("id", editing!["id"] as string);
//       if (error) throw error;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       setEditOpen(false);
//       toast.success("User updated");
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });

//   const create = useMutation({
//     mutationFn: async (values: RecordValues) =>
//       createUser({
//         data: {
//           email: String(values["email"] ?? ""),
//           password: String(values["password"] ?? ""),
//           fullName: String(values["fullName"] ?? ""),
//           role: (values["role"] as "admin" | "user") || "user",
//         },
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       setCreateOpen(false);
//       toast.success("User created");
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });

//   const remove = useMutation({
//     mutationFn: async (userId: string) => deleteUser({ data: { userId } }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success("User deleted");
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });

//   const changeRole = useMutation({
//     mutationFn: async (input: { userId: string; role: "admin" | "user" }) => setRole({ data: input }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success("Role updated");
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });

//   if (!loading && !isAdmin) {
//     return (
//       <Shell breadcrumb={[{ label: "Dashboard", to: "/dashboard" }, { label: "Users" }]}>
//         <EmptyState title="Admins only" hint="This section is available to admin accounts." />
//       </Shell>
//     );
//   }

  return (
    <Shell breadcrumb={[{ label: "Dashboard", to: "/dashboard" }, { label: "Users" }]}>
      <PageHeader
        title="Users & candidates"
        description="Manage accounts, roles and portfolio records across the workspace."
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" /> Add user
          </Button>
        }
      />

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-medium">
            All users <span className="font-normal text-muted-foreground">· {1}</span>
          </p>
        </div>
        {/* {rows.length === 0 ? (
          <EmptyState title="No users yet" />
        ) : ( */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="data-label px-4 py-2.5 font-medium">Candidate</th>
                  <th className="data-label px-4 py-2.5 font-medium">Role</th>
                  <th className="data-label px-4 py-2.5 font-medium">Portfolios</th>
                  <th className="data-label px-4 py-2.5 font-medium">Status</th>
                  <th className="data-label px-4 py-2.5 font-medium">Joined</th>
                  <th className="data-label px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* {rows.map((row: any) => (
                  <tr key={row.id} className="hover:bg-white/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <StoredAvatar path={row.avatar_url} name={row.full_name ?? row.email} />
                        <div className="leading-tight">
                          <p className="font-medium">{row.full_name ?? "Unnamed"}</p>
                          <p className="text-xs text-muted-foreground">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <RoleBadge role={row.role} />
                        <select
                          className="rounded-md bg-white/70 px-1.5 py-1 text-xs ring-1 ring-border"
                          value={row.role}
                          onChange={(e) =>
                            changeRole.mutate({
                              userId: row.id,
                              role: e.target.value as "admin" | "user",
                            })
                          }
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.portfolioCount}</td>
                    <td className="px-4 py-3">
                      <StatusDot status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(row.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit user"
                          onClick={() => {
                            setEditing(row as unknown as RecordValues);
                            setEditOpen(true);
                          }}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete user"
                          className="text-destructive"
                          onClick={() => remove.mutate(row.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
      </div>

      {/* <RecordForm
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit user"
        fields={editFields}
        initial={editing}
        submitting={saveProfile.isPending}
        onSubmit={(values) => saveProfile.mutate(values)}
      />

      <RecordForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Add user"
        description="The account is created confirmed, so they can sign in right away."
        fields={createFields}
        initial={{ role: "user" }}
        submitting={create.isPending}
        onSubmit={(values) => create.mutate(values)}
      /> */}
    </Shell>
  );
}
