import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "../components/ui/button";
import InputField from "../components/ui/InputField";
import { useAuth } from "../hooks/useAuth";
import { userLogin } from "../services/authService";
// import { DEMO_ACCOUNTS, supabase } from "@/lib/mock-db";

export default function Auth() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    //   useEffect(() => {
    //     console.log(user,"==========user")
    //     login(response.records[0])
    //     if (user) navigate({ to: "/dashboard", replace: true });
    //   }, [user]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setBusy(true);
        // if(errors.length > 0) {
        //     setErrors(prev=> []);
        //     return;
        // }
        setBusy(true);
        try{
            const response = await userLogin(email, password)
            if(response.success){
                login(response.data[0])
                navigate('/dashboard');
            }
        }catch(err){
            console.log(err)
            // setApiMessage(err)
        }finally{
            setBusy(false)
        }

    }

    return (
        <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 text-foreground">
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="orb -top-24 -left-24 size-[420px] bg-primary/25"
                    style={{ animation: "drift 18s ease-in-out infinite" }}
                />
                <div
                    className="orb right-0 bottom-0 size-[380px] bg-accent/20"
                    style={{ animation: "drift2 22s ease-in-out infinite" }}
                />
            </div>

            <div className="panel-strong relative z-10 w-full max-w-sm rounded-xl p-6">
                <div className="flex items-center gap-2.5">
                    <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                        C
                    </div>
                    <div className="leading-tight">
                        <p className="text-[15px] font-semibold">Candify</p>
                        <p className="text-[11px] text-muted-foreground">Admin Console</p>
                    </div>
                </div>

                <h1 className="mt-6 text-xl font-semibold tracking-tight">
                    {mode === "signin" ? "Sign in to your console" : "Create your account"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {mode === "signin"
                        ? "Use your email and password to continue."
                        : "You will be able to build portfolios right after signing in."}
                </p>

                <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                    {mode === "signup" ? (
                        <div className="space-y-1.5">
                            <InputField
                                label={{
                                    name: "Full name",
                                    className: "block text-xs font-medium text-muted-foreground",
                                }}
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="field"
                                value={fullName}
                                placeholder="Maya Okonkwo"
                                validation={{
                                    required: true,
                                    maxLength: 100,
                                    allowSpace: true
                                }}
                                handleInput={(target: any, error: string) => { setFullName(target.value) }}
                            />
                        </div>
                    ) : null}
                    <div className="space-y-1.5">
                        <InputField
                            label={{
                                name: "Email",
                                className: "block text-xs font-medium text-muted-foreground",
                            }}
                            type="text"
                            id="username"
                            name="username"
                            className="field"
                            value={email}
                            placeholder="you@company.com"
                            validation={{
                                required: true,
                                maxLength: 100,
                                allowSpace: false
                            }}
                            handleInput={(target: any, error: string) => { setEmail(target.value) }}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <InputField
                            label={{
                                name: "Password",
                                className: "block text-xs font-medium text-muted-foreground",
                            }}
                            type="password"
                            id="password"
                            name="password"
                            className="field"
                            value={password}
                            placeholder="••••••••"
                            validation={{
                                required: true,
                                maxLength: 15,
                                allowSpace: false
                            }}
                            handleInput={(target: any, error: string) => { setPassword(target.value) }}
                        // handleInput={(target, error)=>{
                        //     setUsername(target.value)
                        //     if(error !== ''){
                        //         setErrors((prev)=> {
                        //             return [
                        //                 error
                        //             ]
                        //         })
                        //     }
                        // }}
                        />

                    </div>

                    <Button type="submit" className="w-full" disabled={busy}>
                        {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                        {mode === "signin" ? "Sign in" : "Create account"}
                    </Button>
                </form>
                <p className="mt-5 text-center text-sm text-muted-foreground">
                    {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
                    <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                    >
                        {mode === "signin" ? "Create an account" : "Sign in"}
                    </button>
                </p>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                    <Link to="/" className="hover:text-foreground">
                        Back to home
                    </Link>
                </p>
            </div>
        </div>
    );
}
