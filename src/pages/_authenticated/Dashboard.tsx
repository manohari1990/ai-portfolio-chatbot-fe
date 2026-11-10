import Metric from "../../components/app/Metric";
import { api, type Session } from "../../services/api";
import {
    ArrowUpRight,
    Bell,
    BookOpenText,
    Bot,
    ChevronDown,
    CircleHelp,
    FileText,
    Globe2,
    Home,
    LayoutTemplate,
    LogOut,
    MoreHorizontal,
    PanelLeftClose,
    Settings,
    Sparkles,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import Checklist from "../../components/app/Checklist";
import Activity from "../../components/app/Activity";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const USER_STORAGE_KEY = 'portfolio-os-session'

export default function Dashboard() {    
    const [notice, setNotice] = useState<string | null>(null);
    const [active, setActive] = useState("Overview");
    const navigate = useNavigate();
    const {user} = useAuth();
    const [session, setSession] = useState<Session | null>(() => {
        return (user ?  JSON.parse(user) : null) as Session | null
    })

    const signout = () => {
        localStorage.removeItem(USER_STORAGE_KEY);
        setSession(null);
        navigate("/auth");
    }

    // useEffect(() => {
    //     if (!session) return;
    //     api
    //         .portfolios(session.token)
    //         //   .then(setPortfolios)
    //         .catch((error: Error) => {
    //             // setPortfolioError(error.message);
    //             if (error.message.toLowerCase().includes("session")) {
    //                 localStorage.removeItem(USER_STORAGE_KEY);
    //                 setSession(null);
    //             }
    //         });
    // }, [session]);

    type NavItem = { label: string; icon: typeof Home };
    const primaryNav: NavItem[] = [
        { label: "Overview", icon: Home },
        { label: "Portfolio content", icon: LayoutTemplate },
        { label: "Knowledge base", icon: BookOpenText },
        { label: "Chatbot", icon: Bot },
    ];

    const knowledge = [
        ["Professional profile", "Manually edited", "Ready", "just now"],
        ["alex-resume-2026.pdf", "Resume import", "Ready", "2 mins ago"],
        ["Selected projects", "Portfolio content", "Ready", "today"],
    ];


    const showNotice = (message: string) => {
        setNotice(message);
        window.setTimeout(() => setNotice(null), 2600);
    };


    const ownerInitials = session?.user?.displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();


    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
            <aside className="fixed inset-y-0 left-0 z-20 flex w-[258px] flex-col border-r border-slate-200/80 bg-white px-4 py-5">
                <div className="flex items-center gap-3 px-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 shadow-lg shadow-indigo-200">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        folio<span className="text-indigo-600">.</span>
                    </span>
                </div>

                <button
                    className="mt-8 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition hover:border-indigo-200"
                    onClick={() => showNotice("Portfolio switcher coming next")}
                >
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#161c36] text-xs font-bold text-white">
                        {ownerInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                            {session?.user?.displayName}
                        </p>
                        <p className="text-xs text-slate-500">
                            PORTFOLIO NAME
                            {/* {selectedPortfolio?.name ?? "Loading portfolio…"} */}
                        </p>
                    </div>
                    <ChevronDown size={15} className="text-slate-400" />
                </button>

                <nav className="mt-6 space-y-1">
                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">
                        Workspace
                    </p>
                    {primaryNav.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => setActive(label)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active === label
                                ? "bg-indigo-50 text-indigo-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon size={18} strokeWidth={active === label ? 2.4 : 1.9} />
                            {label}
                            {label === "Knowledge base" && (
                                <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                                    3
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <nav className="mt-8 space-y-1">
                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">
                        Manage
                    </p>
                    <button
                        onClick={() => setActive("Analytics")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <Users size={18} />
                        Visitors
                    </button>
                    <button
                        onClick={() => setActive("Settings")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <Settings size={18} />
                        Settings
                    </button>
                </nav>

                <div className="mt-auto space-y-2">
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                        <CircleHelp size={18} />
                        Help & resources
                    </button>
                    <div className="flex items-center gap-3 border-t border-slate-100 px-3 pt-4 cursor-pointer" onClick={signout}>
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                            <LogOut size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500">Sign out</p>
                        </div>
                        {/* <MoreHorizontal className="ml-auto text-slate-400" size={18} onClick={() => {console.log(session)}} /> */}
                    </div>
                </div>
            </aside>

            <main className="ml-[258px] min-h-screen">
                <header className="flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white px-9">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <button className="rounded-lg p-2 hover:bg-slate-100">
                            <PanelLeftClose size={18} />
                        </button>
                        <span>Workspace</span>
                        <span>/</span>
                        <span className="font-medium text-slate-800">{active}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                            <Bell size={19} />
                            <i className="absolute right-2 top-2 block h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        </button>
                        {/* <button
              onClick={() =>
                selectedPortfolio
                  ? showNotice(`Public URL: /${selectedPortfolio.slug}`)
                  : showNotice("Portfolio is loading")
              }
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-300"
            >
              <Globe2 size={16} />
              View site <ArrowUpRight size={14} />
            </button> */}
                    </div>
                </header>

                <section className="mx-auto max-w-[1280px] px-9 py-9">
                    <div className="flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="mb-2 text-sm font-medium text-indigo-600">
                                Your portfolio workspace
                            </p>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Hi,
                                {/* {session.user.displayName.split(" ")[0]}{" "} */}
                                <span className="inline-block origin-bottom-right text-2xl">
                                    👋
                                </span>
                            </h1>
                            <p className="mt-2 text-slate-500">
                                {/* {portfolioError ??
                  (selectedPortfolio
                    ? `Managing ${selectedPortfolio.name}`
                    : "Loading your portfolio…")} */}
                            </p>
                        </div>
                        {/* <button
              onClick={() => setImportOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add content
            </button> */}
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        <Metric
                            label="Portfolio completeness"
                            value="78%"
                            detail="Almost there — add your experience"
                            progress="78"
                        />
                        <Metric
                            label="Chat conversations"
                            value="24"
                            detail="+8 this week"
                            trend
                        />
                        <Metric
                            label="Knowledge sources"
                            value="3"
                            detail="All sources are ready"
                            ready
                        />
                    </div>

                    <div className="mt-8 grid gap-7 xl:grid-cols-[1.45fr_.8fr]">
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-bold">Build your portfolio</h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Complete these to make a stronger first impression.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActive("Portfolio content")}
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    View all
                                </button>
                            </div>
                            <div className="mt-6 space-y-1">
                                <Checklist
                                    done
                                    label="Your professional profile"
                                    detail="A concise introduction and your current role."
                                />
                                <Checklist
                                    done
                                    label="Skills & expertise"
                                    detail="12 skills added"
                                />
                                <Checklist
                                    label="Work experience"
                                    detail="Add your career journey and impact."
                                    action="Add experience"
                                    onAction={() => showNotice("Experience editor opened")}
                                />
                                <Checklist
                                    label="Featured projects"
                                    detail="Showcase work you’re proud of."
                                    action="Add project"
                                    onAction={() => showNotice("Project editor opened")}
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl bg-[#151a32] p-6 text-white shadow-xl shadow-slate-300/50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                                <Bot size={19} className="text-violet-300" />
                            </div>
                            <p className="mt-5 text-xs font-semibold uppercase tracking-[.12em] text-violet-300">
                                Your portfolio assistant
                            </p>
                            <h2 className="mt-2 text-xl font-bold leading-snug">
                                Ready to answer visitor questions.
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                It uses only your approved portfolio knowledge to give clear,
                                accurate answers.
                            </p>
                            <button
                                onClick={() => setActive("Chatbot")}
                                className="mt-6 flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-200"
                            >
                                Configure assistant <ArrowUpRight size={15} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-7 xl:grid-cols-[1.45fr_.8fr]">
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-bold">Knowledge base</h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Content your assistant can use in conversations.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActive("Knowledge base")}
                                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-50"
                                >
                                    <MoreHorizontal size={19} />
                                </button>
                            </div>
                            <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
                                        <tr>
                                            <th className="px-4 py-3">SOURCE</th>
                                            <th className="px-4 py-3">TYPE</th>
                                            <th className="px-4 py-3">STATUS</th>
                                            <th className="px-4 py-3">UPDATED</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {knowledge.map(([name, type, status, updated]) => (
                                            <tr key={name} className="border-t border-slate-100">
                                                <td className="px-4 py-3.5 font-medium text-slate-700">
                                                    <span className="mr-2 inline-flex rounded-md bg-rose-50 p-1.5 align-middle text-rose-500">
                                                        <FileText size={13} />
                                                    </span>
                                                    {name}
                                                </td>
                                                <td className="px-4 py-3.5 text-slate-500">{type}</td>
                                                <td className="px-4 py-3.5">
                                                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5 text-slate-500">
                                                    {updated}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-bold">Recent activity</h2>
                                <button className="text-sm font-semibold text-indigo-600">
                                    See all
                                </button>
                            </div>
                            <div className="mt-5 space-y-5">
                                <Activity
                                    icon={Bot}
                                    title="New chat conversation"
                                    detail="A visitor asked about your React work"
                                    time="12 min ago"
                                />
                                <Activity
                                    icon={FileText}
                                    title="Resume processed"
                                    detail="6 skills and 2 experiences extracted"
                                    time="2 hours ago"
                                />
                                <Activity
                                    icon={Globe2}
                                    title="Portfolio published"
                                    detail="alexstone.folio.app is now live"
                                    time="Yesterday"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* {active === "Portfolio content" && selectedPortfolio && (
        <PortfolioContent
          portfolio={selectedPortfolio}
          token={session.token}
          onClose={() => setActive("Overview")}
        />
      )} */}
            {/* {importOpen && (
        <ImportModal
          onClose={() => setImportOpen(false)}
          onSelect={(value) => {
            setImportOpen(false);
            showNotice(`${value} flow started`);
          }}
        />
      )} */}
            {notice && (
                <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
                    {notice}
                </div>
            )}
        </div>
    );
}