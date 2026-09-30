// import { createFileRoute } from "@tanstack/react-router";

import { CrudSection } from "../../components/console/CrudSection";
import { PageHeader, StatusDot } from "../../components/console/PageParts";
import type { FieldDef } from "../../components/console/RecordForm";
import { Shell } from "../../components/console/Shell";

// import { CrudSection } from "@/components/console/crud-section";
// import { PageHeader, StatusDot } from "@/components/console/page-parts";
// import type { FieldDef } from "@/components/console/record-form";
// import { Shell } from "@/components/console/shell";
// import { useAuth, useRole } from "@/hooks/use-auth";


const fields: FieldDef[] = [
  { name: "name", label: "Name", full: false },
  { name: "email", label: "Email", full: false },
  { name: "company", label: "Company", full: false },
  { name: "location", label: "Location", full: false },
  { name: "source", label: "Source", placeholder: "LinkedIn", full: false },
  {
    name: "status",
    label: "Status",
    type: "select",
    full: false,
    options: [
      { value: "new", label: "New" },
      { value: "active", label: "Active" },
      { value: "idle", label: "Idle" },
    ],
  },
];

export default function Visitors() {
//   const { user } = useAuth();
  const { isAdmin } = true//useRole();
//   if (!user) return null;

  return (
    <Shell breadcrumb={[{ label: "Chatbot" }, { label: "Visitors" }]}>
      <PageHeader title="Visitors" description="Everyone the assistant has met, and where they came from." />
      <CrudSection
        table="visitors"
        parentColumn="user_id"
        parentId={'122234324'}
        showAll={isAdmin}
        singular="Visitor"
        fields={fields}
        emptyHint="Visitors appear here once your assistant starts talking to people."
        columns={[
          { key: "name", label: "Visitor" },
          { key: "email", label: "Email" },
          { key: "company", label: "Company" },
          { key: "source", label: "Source" },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusDot status={row["status"] as string} />,
          },
        ]}
      />
    </Shell>
  );
}
