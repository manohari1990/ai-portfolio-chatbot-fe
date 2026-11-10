export default function Checklist({
  done,
  label,
  detail,
  action,
  onAction,
}: {
  done?: boolean;
  label: string;
  detail: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-slate-50">
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${done
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-slate-300"
          }`}
      >
        {done && "✓"}
      </span>
      <div className="flex-1">
        <p
          className={`text-sm font-semibold ${done
              ? "text-slate-500 line-through decoration-slate-300"
              : "text-slate-800"
            }`}
        >
          {label}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          {action}
        </button>
      )}
    </div>
  );
}