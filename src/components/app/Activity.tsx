import type { Bot } from "lucide-react";

export default function Activity({
  icon: Icon,
  title,
  detail,
  time,
}: {
  icon: typeof Bot;
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon size={15} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-500">{detail}</p>
        <p className="mt-1 text-[11px] text-slate-400">{time}</p>
      </div>
    </div>
  );
}