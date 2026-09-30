import { EmptyState, PageHeader } from "../../components/console/PageParts";
import { Shell } from "../../components/console/Shell";
import { useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Convo = any;

export default function Conversations() {
//   const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
//   const { data } = useQuery({
//     queryKey: ["conversation-history", user?.id],
//     enabled: !!user,
//     queryFn: async () => {
//       const [c, v] = await Promise.all([
//         supabase.from("conversations").select("*").order("last_message_at", { ascending: false }),
//         supabase.from("visitors").select("*"),
//       ]);
//       const names = new Map((v.data ?? []).map((x: Convo) => [x.id, x.name]));
//       return (c.data ?? []).map((x: Convo) => ({ ...x, visitor: names.get(x.visitor_id) ?? "Anonymous" }));
//     },
//   });
//   if (!user) return null;
  const rows: Convo[] = [];
  const active = rows.find((r) => r.id === selected) ?? rows[0];

  return (
    <Shell breadcrumb={[{ label: "Chatbot" }, { label: "Conversations" }]}>
      <PageHeader title="Conversation history" description="A read-only log of chats your assistant has handled." />
      {rows.length === 0 ? (
        <div className="panel"><EmptyState title="No conversations yet" /></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <div className="panel divide-y divide-border overflow-hidden">
            {rows.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`block w-full px-4 py-3 text-left hover:bg-muted/50 ${active?.id === r.id ? "bg-muted/60" : ""}`}
              >
                <p className="truncate text-sm font-medium">{r.subject}</p>
                <p className="data-label mt-0.5">
                  {r.visitor} · {r.channel} · {new Date(r.last_message_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
          {active ? (
            <div className="panel p-5">
              <h2 className="text-base font-semibold">{active.subject}</h2>
              <p className="data-label mt-1">
                {active.visitor} · {active.message_count} messages · {new Date(active.last_message_at).toLocaleString()}
              </p>
              <div className="mt-4 space-y-2">
                {String(active.transcript ?? "").split("\n").filter(Boolean).map((line, i) => {
                  const bot = line.startsWith("Assistant:");
                  return (
                    <div key={i} className={`flex ${bot ? "justify-start" : "justify-end"}`}>
                      <p className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${bot ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                        {line.replace(/^(Assistant|Visitor):\s*/, "")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Shell>
  );
}