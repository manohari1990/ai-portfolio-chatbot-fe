import { Loader2, Paperclip, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// import { StoredFileLink, StoredImage } from "@/components/console/file-url";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";
// import { fileNameFromPath, uploadFile } from "@/lib/storage";
import { cn } from "../../lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "number" | "select" | "file" | "image" | "switch";
  options?: { value: string; label: string }[];
  placeholder?: string;
  folder?: string;
  accept?: string;
  full?: boolean;
  required?: boolean;
};

export type RecordValues = Record<string, unknown>;

function FileField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file || !user) return;
    setBusy(true);
    try {
    //   const path = await uploadFile(file, user.id, field.folder ?? "files");
    //   onChange(path);
    //   toast.success(`${file.name} uploaded`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="rounded-lg border border-dashed border-border bg-white/40 p-4 text-center block cursor-pointer hover:bg-white/60">
        <input
          type="file"
          className="hidden"
          accept={field.accept}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {busy ? (
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Uploading…
          </span>
        ) : (
          <>
            <p className="text-sm text-secondary-foreground">Drag &amp; drop or browse</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {field.accept ?? "Any file"} up to 20MB
            </p>
          </>
        )}
      </label>
      {value ? (
        <div className="flex items-center gap-2 rounded-md bg-white/60 px-2 py-1.5">
          {/* {field.type === "image" ? (
            <StoredImage path={value} alt={field.label} className="size-10 rounded-md object-cover" />
          ) : (
            <Paperclip className="size-3.5 text-muted-foreground" />
          )}
          <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
            {fileNameFromPath(value)}
          </span>
          <StoredFileLink path={value} label="Open" /> */}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Remove file"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function RecordForm({
  open,
  onOpenChange,
  title,
  description,
  fields,
  initial,
  submitting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FieldDef[];
  initial?: RecordValues | null;
  submitting?: boolean;
  onSubmit: (values: RecordValues) => void | Promise<void>;
}) {
  const [values, setValues] = useState<RecordValues>({});

  useEffect(() => {
    if (!open) return;
    const next: RecordValues = {};
    for (const field of fields) {
      const raw = initial?.[field.name];
      next[field.name] = raw === undefined || raw === null ? (field.type === "switch" ? false : "") : raw;
    }
    setValues(next);
  }, [open, initial, fields]);

  function set(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <form
          className="grid grid-cols-2 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit(values);
          }}
        >
          {fields.map((field) => {
            const value = values[field.name];
            return (
              <div
                key={field.name}
                className={cn("space-y-1.5", field.full !== false ? "col-span-2" : "col-span-1")}
              >
                <label className="block text-xs font-medium text-muted-foreground">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    className="field h-24 py-2 leading-snug"
                    placeholder={field.placeholder}
                    value={String(value ?? "")}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="field"
                    value={String(value ?? "")}
                    onChange={(e) => set(field.name, e.target.value)}
                  >
                    <option value="">Select…</option>
                    {field.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "switch" ? (
                  <label className="flex h-9 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="size-4 accent-primary"
                      checked={Boolean(value)}
                      onChange={(e) => set(field.name, e.target.checked)}
                    />
                    <span className="text-muted-foreground">{field.placeholder ?? "Enabled"}</span>
                  </label>
                ) : field.type === "file" || field.type === "image" ? (
                  <FileField
                    field={field}
                    value={(value as string) || null}
                    onChange={(next) => set(field.name, next)}
                  />
                ) : (
                  <input
                    className="field"
                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={String(value ?? "")}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                )}
              </div>
            );
          })}

          <DialogFooter className="col-span-2 mt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
