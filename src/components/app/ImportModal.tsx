import { ArrowUpRight, Globe2, LayoutTemplate, Upload } from "lucide-react";

export default function ImportModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (value: string) => void;
}) {

    const quickActions = [
    {
        title: "Import from resume",
        description: "Extract your experience and skills from a file.",
        icon: Upload,
        accent: "bg-violet-50 text-violet-600",
    },
    {
        title: "Import from website",
        description: "Bring in content from your existing site.",
        icon: Globe2,
        accent: "bg-sky-50 text-sky-600",
    },
    {
        title: "Edit portfolio",
        description: "Polish the information visitors see first.",
        icon: LayoutTemplate,
        accent: "bg-amber-50 text-amber-600",
    },
    ];
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Add portfolio content</h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose how you’d like to get started.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {quickActions.map(({ title, description, icon: Icon, accent }) => (
            <button
              key={title}
              onClick={() => onSelect(title)}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/30"
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}
              >
                <Icon size={19} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">{title}</span>
                <span className="mt-1 block text-xs text-slate-500">
                  {description}
                </span>
              </span>
              <ArrowUpRight size={17} className="text-slate-400" />
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full py-2 text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}