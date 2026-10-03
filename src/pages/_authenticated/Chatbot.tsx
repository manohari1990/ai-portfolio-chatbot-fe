// import { createFileRoute } from "@tanstack/react-router";

// import { CrudSection } from "@/components/console/crud-section";
import { CrudSection } from "../../components/console/CrudSection";
import { PageHeader } from "../../components/console/PageParts";
import type { FieldDef } from "../../components/console/RecordForm";
import { Shell } from "../../components/console/Shell";
// import { useAuth, useRole } from "../../hooks/useAuth";

// export const Route = createFileRoute("/_authenticated/chatbot")({
//   head: () => ({
//     meta: [
//       { title: "Chatbot configuration — AI Portfolio Console" },
//       { name: "description", content: "Set up the assistant that greets visitors on your portfolio." },
//       { property: "og:title", content: "Chatbot configuration — AI Portfolio Console" },
//       { property: "og:description", content: "Set up the assistant that greets visitors on your portfolio." },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: ChatbotPage,
// });

const fields: FieldDef[] = [
  { name: "name", label: "Assistant name", required: true, full: false },
  {
    name: "tone",
    label: "Tone",
    type: "select",
    full: false,
    options: [
      { value: "professional", label: "Professional" },
      { value: "friendly", label: "Friendly" },
      { value: "concise", label: "Concise" },
    ],
  },
  { name: "welcome_message", label: "Welcome message", type: "textarea" },
  { name: "system_prompt", label: "Instructions", type: "textarea", placeholder: "How should the assistant answer?" },
  { name: "accent_color", label: "Accent colour", placeholder: "#4f46e5", full: false },
  { name: "is_active", label: "Live", type: "switch", placeholder: "Assistant is live", full: false },
  { name: "collect_email", label: "Ask visitors for email", type: "switch", placeholder: "Collect email", full: false },
  { name: "avatar_url", label: "Assistant avatar", type: "image", folder: "chatbot", accept: "image/*" },
];

export default function Chatbot() {
//   const { user } = useAuth();
//   const { isAdmin } = useRole();
//   if (!user) return null;

  return (
    <Shell breadcrumb={[{ label: "Chatbot" }, { label: "Configuration" }]}>
      <PageHeader
        title="Chatbot configuration"
        description="Each assistant has its own greeting, tone and instructions. Visitors and conversations are grouped under it."
      />
      <CrudSection
        table="chatbot_configs"
        parentColumn="user_id"
        parentId={'243243'}
        showAll={true}
        singular="Assistant"
        fields={fields}
        emptyHint="Create an assistant to start collecting visitors and conversations."
        columns={[
          { key: "name", label: "Assistant" },
          { key: "tone", label: "Tone" },
          {
            key: "is_active",
            label: "Live",
            render: (row) => (row["is_active"] ? "Yes" : "No"),
          },
          { key: "welcome_message", label: "Welcome message" },
        ]}
      />
    </Shell>
  );
}
