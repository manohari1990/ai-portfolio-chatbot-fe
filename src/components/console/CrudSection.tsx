import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { RecordForm, type FieldDef } from "./RecordForm";

export function CrudSection({
  table,
  parentColumn,
  parentId,
  singular,
  fields,
  columns,
  emptyHint,
  showAll = false,
  orderBy = "created_at",
}: {
  table: string;
  parentColumn: string;
  parentId: string;
  singular: string;
  fields: FieldDef[];
  columns: { key: string; label: string; render?: (row: Row) => ReactNode }[];
  emptyHint?: string;
  showAll?: boolean;
  orderBy?: string;
}) {
    return (
        <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-medium">
            {singular}s <span className="font-normal text-muted-foreground">· {0}</span>
            </p>
            <Button
            size="sm"
            onClick={() => {
                // setEditing(null);
                // setOpen(true);
            }}
            >
            <Plus className="size-4" /> Add {singular.toLowerCase()}
            </Button>
        </div>

        {/* {isLoading ? (
            <EmptyState title="Loading…" />
        ) : rows.length === 0 ? (
            <EmptyState title={`No ${singular.toLowerCase()} records yet`} hint={emptyHint} />
        ) : ( */}
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="border-b border-border text-left">
                    {/* {columns.map((c) => (
                    <th key={c.key} className="data-label px-4 py-2.5 font-medium">
                        {c.label}
                    </th>
                    ))} */}
                    <th className="data-label px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-border">
                {/* {rows.map((row) => (
                    <tr key={String(row["id"])} className="hover:bg-white/60">
                    {columns.map((c) => (
                        <td key={c.key} className="px-4 py-3 align-top">
                        {c.render ? c.render(row) : ((row[c.key] as ReactNode) ?? "—")}
                        </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Edit ${singular}`}
                            onClick={() => {
                            setEditing(row);
                            setOpen(true);
                            }}
                        >
                            <Pencil className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Delete ${singular}`}
                            className="text-destructive"
                            onClick={() => remove.mutate(row["id"] as string)}
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
        {/* )} */}

        {/* <RecordForm
            open={open}
            onOpenChange={setOpen}
            title={editing ? `Edit ${singular.toLowerCase()}` : `New ${singular.toLowerCase()}`}
            fields={fields}
            initial={editing}
            submitting={save.isPending}
            onSubmit={(values) => save.mutate(values)}
        /> */}
        </div>
    );
}