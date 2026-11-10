export default function Metric({
  label,
  value,
  detail,
  progress,
  trend,
  ready,
}: {
  label: string;
  value: string;
  detail: string;
  progress?: string;
  trend?: boolean;
  ready?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end gap-2">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {trend && (
          <span className="mb-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-600">
            ↗ 50%
          </span>
        )}
      </div>
      {progress ? (
        <>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-indigo-500"
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">{detail}</p>
        </>
      ) : (
        <p
          className={`mt-3 text-xs ${ready ? "text-emerald-600" : "text-slate-500"
            }`}
        >
          {ready && "● "}
          {detail}
        </p>
      )}
    </div>
  );
}