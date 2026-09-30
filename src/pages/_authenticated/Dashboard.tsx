import { Link } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { PageHeader, StatCard } from "../../components/console/PageParts";
import { Shell } from "../../components/console/Shell";
import { Button } from "../../components/ui/button";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "../../components/ui/Chart";
// import { useAuth, useRole } from "@/hooks/use-auth";
// import { supabase } from "@/lib/mock-db";



/* eslint-disable @typescript-eslint/no-explicit-any */
const LEAD = new Set(["contacted", "qualified"]);

const chartConfig = {
    visitors: { label: "Visitors", color: "var(--primary)" },
    engagements: { label: "Engagements", color: "var(--accent)" },
    leads: { label: "Leads", color: "oklch(0.65 0.17 150)" },
    users: { label: "New users", color: "var(--primary)" },
    portfolios: { label: "New portfolios", color: "var(--accent)" },
} satisfies ChartConfig;

// function lastSixMonths() {
//     const out: { key: string; month: string }[] = [];
//     const now = new Date();
//     for (let i = 5; i >= 0; i--) {
//         const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//         out.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: d.toLocaleString("en", { month: "short" }) });
//     }
//     return out;
// }
// const monthKey = (iso: string) => {
//     const d = new Date(iso);
//     return `${d.getFullYear()}-${d.getMonth()}`;
// };

function pctChange(cur: number, prev: number) {
    if (!prev) return cur ? "new this month" : "no change";
    const p = Math.round(((cur - prev) / prev) * 100);
    return `${p >= 0 ? "+" : ""}${p}% vs last month`;
}

export default function Dashboard() {
    // const { user } = useAuth();
    const { isAdmin } = true//useRole();
    console.log("test")

    const data = {}
    // const months = data?.months ?? [];
    // const cur = months[5];
    // const prev = months[4];
    // const t = data?.totals;

    return (
        <Shell breadcrumb={[{ label: "Dashboard" }, { label: "Overview" }]}>
            <PageHeader
                title={isAdmin ? "Workspace overview" : "Your overview"}
                description={
                    isAdmin
                        ? "Users, portfolios, visitors, engagement and leads across every account."
                        : "How clients are engaging with your portfolios each month."
                }
                actions={
                    <Button asChild>
                        <Link to="/portfolios">Go to portfolios</Link>
                    </Button>
                }
            />

            {isAdmin ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    <StatCard label="Users" value={0} hint={`0 joined this month`} />
                    <StatCard label="Portfolios" value={0} hint={`0 created this month`} />
                    <StatCard label="Visitors" value={0} hint={''} />
                    <StatCard label="Engagements" value={0} hint={''} />
                    <StatCard label="Leads" value={0} hint={`0% of visitors`} tone="positive" />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard label="Visitors this month" value={0} hint={pctChange(0, 0)} />
                    <StatCard label="Engagements this month" value={0} hint={pctChange(0, 0)} />
                    <StatCard label="Leads this month" value={0} hint={pctChange(0, 0)} tone="positive" />
                    <StatCard label="Lead conversion" value={`0%`} hint={`0 leads from 0 visitors`} />
                </div>
            )}

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="panel p-4 lg:col-span-2">
                    <p className="text-sm font-medium">Monthly client engagement</p>
                    <p className="data-label mt-0.5">Visitors, conversations and leads · last 6 months</p>
                    <ChartContainer config={chartConfig} className="mt-4 h-[260px] w-full">
                        <AreaChart data={[]} margin={{ left: -16, right: 8 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Area dataKey="visitors" type="monotone" stroke="var(--color-visitors)" fill="var(--color-visitors)" fillOpacity={0.15} />
                            <Area dataKey="engagements" type="monotone" stroke="var(--color-engagements)" fill="var(--color-engagements)" fillOpacity={0.15} />
                            <Area dataKey="leads" type="monotone" stroke="var(--color-leads)" fill="var(--color-leads)" fillOpacity={0.2} />
                        </AreaChart>
                    </ChartContainer>
                </div>

                <div className="panel p-4">
                    <p className="text-sm font-medium">{isAdmin ? "Platform growth" : "Leads per month"}</p>
                    <p className="data-label mt-0.5">{isAdmin ? "New users & portfolios" : "Contacted or qualified visitors"}</p>
                    <ChartContainer config={chartConfig} className="mt-4 h-[260px] w-full">
                        {isAdmin ? (
                            <LineChart data={[]} margin={{ left: -16, right: 8 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Line dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={false} />
                                <Line dataKey="portfolios" stroke="var(--color-portfolios)" strokeWidth={2} dot={false} />
                            </LineChart>
                        ) : (
                            <BarChart data={[]} margin={{ left: -16, right: 8 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="leads" fill="var(--color-leads)" radius={4} />
                            </BarChart>
                        )}
                    </ChartContainer>
                </div>
            </div>

            <div className="panel overflow-hidden">
                <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-medium">{isAdmin ? "Stats by user" : "Monthly breakdown"}</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border text-left">
                                <th className="data-label px-4 py-2.5 font-medium">{isAdmin ? "User" : "Month"}</th>
                                {isAdmin ? <th className="data-label px-4 py-2.5 text-right font-medium">Portfolios</th> : null}
                                <th className="data-label px-4 py-2.5 text-right font-medium">Visitors</th>
                                <th className="data-label px-4 py-2.5 text-right font-medium">Engagements</th>
                                <th className="data-label px-4 py-2.5 text-right font-medium">Leads</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border font-mono tabular-nums">
                            {/* {(isAdmin ? data?.perUser ?? [] : [...months].reverse()).map((r: any) => (
                                <tr key={r.name ?? r.key} className="hover:bg-white/60">
                                    <td className="px-4 py-2.5 font-sans">{r.name ?? r.month}</td>
                                    {isAdmin ? <td className="px-4 py-2.5 text-right">{r.portfolios}</td> : null}
                                    <td className="px-4 py-2.5 text-right">{r.visitors}</td>
                                    <td className="px-4 py-2.5 text-right">{r.engagements}</td>
                                    <td className="px-4 py-2.5 text-right">{r.leads}</td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <div className="panel overflow-hidden">
                <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-medium">Recently updated portfolios</p>
                </div>
                {(data?.recent ?? []).length === 0 ? (
                    <EmptyState title="No portfolios yet" hint="Create your first portfolio to get started." />
                ) : (
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-border">
                            {(data?.recent ?? []).map((row: any) => (
                                <tr key={row.id} className="hover:bg-white/60">
                                    <td className="px-4 py-3">
                                        <Link to="/portfolios/$portfolioId" params={{ portfolioId: row.id }} className="font-medium hover:text-primary">
                                            {row.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{row.specialization ?? "—"}</td>
                                    <td className="px-4 py-3"><StatusDot status={row.status} /></td>
                                    <td className="px-4 py-3 text-muted-foreground">{new Date(row.updated_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div> */}
        </Shell>
    );
}
