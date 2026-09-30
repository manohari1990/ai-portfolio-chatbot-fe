import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { Shell } from "../../components/console/Shell";
import { PageHeader, RoleBadge } from "../../components/console/PageParts";
import { StoredAvatar } from "../../components/console/FileUrl";

export default function SettingsPage() {
//   const { user } = useAuth();
//   const { role } = useRole();
//   const { data: profile } = useProfile();
//   const queryClient = useQueryClient();
  const [form, setForm] = useState({
    full_name: "",
    headline: "",
    phone: "",
    location: "",
    summary: "",
    avatar_url: "",
  });
  const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     // if (!profile) return;
//     setForm({
//       full_name: profile.full_name ?? "",
//       headline: profile.headline ?? "",
//       phone: profile.phone ?? "",
//       location: profile.location ?? "",
//       summary: profile.summary ?? "",
//       avatar_url: profile.avatar_url ?? "",
//     });
//   }, [profile]);

//   const save = useMutation({
//     mutationFn: async () => {
//       const { error } = await supabase.from("profiles").update(form).eq("id", user!.id);
//       if (error) throw error;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
//       toast.success("Profile saved");
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });

//   async function handleAvatar(file?: File) {
//     if (!file || !user) return;
//     setUploading(true);
//     try {
//       const path = await uploadFile(file, user.id, "avatars");
//       setForm((prev) => ({ ...prev, avatar_url: path }));
//       const { error } = await supabase.from("profiles").update({ avatar_url: path }).eq("id", user.id);
//       if (error) throw error;
//       queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
//       toast.success("Profile picture updated");
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   }

  return (
    <Shell breadcrumb={[{ label: "Dashboard", to: "/dashboard" }, { label: "Your profile" }]}>
      <PageHeader title="Your profile" description="This information appears next to your account in the console." />

      <div className="panel max-w-2xl space-y-5 p-5">
        <div className="flex items-center gap-4">
          <StoredAvatar path={form.avatar_url} name={form.full_name} className="size-20 rounded-xl" />
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Profile picture</p>
            <label className="inline-flex h-8 cursor-pointer items-center rounded-lg bg-white/70 px-3 text-sm text-secondary-foreground ring-1 ring-border hover:bg-white">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                // onChange={(e) => handleAvatar(e.target.files?.[0])}
              />
              {uploading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Upload photo
            </label>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <RoleBadge role={'admin'} />
            {/* <p className="text-xs text-muted-foreground">{profile?.email}</p> */}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">Full name</label>
            <input
              className="field"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">Headline</label>
            <input
              className="field"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">Phone</label>
            <input className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">Location</label>
            <input
              className="field"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs font-medium text-muted-foreground">Summary</label>
            <textarea
              className="field h-24 py-2 leading-snug"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
          </div>
        </div>

        <Button onClick={() => {}} disabled={true}>
          {/* {save.isPending ? <Loader2 className="size-4 animate-spin" /> : null} */}
          Save changes
        </Button>
      </div>
    </Shell>
  );
}
