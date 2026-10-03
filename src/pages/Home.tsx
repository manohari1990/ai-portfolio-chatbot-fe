import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

// import { useNavigate } from "react-router-dom";
export default function Home() {
    // const { session, loading } = useAuth();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!loading && session) navigate({ to: "/dashboard", replace: true });
    // }, [loading, session, navigate]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="orb -top-24 -left-24 size-[420px] bg-primary/25"
                    style={{ animation: "drift 18s ease-in-out infinite" }}
                />
                <div
                    className="orb top-1/3 right-0 size-[380px] bg-accent/20"
                    style={{ animation: "drift2 22s ease-in-out infinite" }}
                />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-6">
                <header className="flex h-16 items-center gap-2.5">
                    <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                        AIP
                    </div>
                    <div className="leading-tight">
                        <p className="text-[15px] font-semibold">AI Portfolio Manager</p>
                        <p className="text-[11px] text-muted-foreground">Admin Console</p>
                    </div>
                    <div className="ml-auto">
                        <Button asChild size="sm">
                            <Link to="/auth">
                                Sign in <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </header>

                <div className="flex flex-1 flex-col justify-center py-16">
                    <h1 className="max-w-[24ch] text-4xl font-semibold tracking-tight text-balance">
                        Candidates, portfolios and chatbot activity in one console.
                    </h1>
                    <p className="mt-3 max-w-[60ch] text-pretty text-muted-foreground">
                        Create an account, build your portfolios and keep every skill, project, role and
                        certificate current — with files attached where they belong.
                    </p>

                    {/* <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {highlights.map((item) => (
                            <div key={item.title} className="panel p-5">
                                <item.icon className="size-5 text-primary" />
                                <p className="mt-3 text-sm font-medium">{item.title}</p>
                                <p className="mt-1 text-sm text-pretty text-muted-foreground">{item.body}</p>
                            </div>
                        ))}
                    </div> */}

                    <div className="mt-8">
                        <Button asChild>
                            <Link to="/auth">
                                Create your account <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}