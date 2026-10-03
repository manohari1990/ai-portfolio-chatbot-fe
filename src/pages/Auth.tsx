import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "../components/ui/button";
import InputField from "../components/ui/InputField";
import { useAuth } from "../hooks/useAuth";
import { registerUser, userLogin } from "../services/authService";
import { REGISTRATION_PAYLOAD } from "../lib/Constant";
interface RegistrationPayload{
    first_name?: string,
    last_name?: string,
    username?: string,
    email: string,
    password: string,
    phone?: string
}
export default function Auth() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [formData, setformData] = useState<RegistrationPayload>(REGISTRATION_PAYLOAD)
    const [busy, setBusy] = useState(false);
    const { login } = useAuth();
    const [errors, setErrors] = useState([])
    const [apiResponse, setApiResponse] = useState('')
    const navigate = useNavigate();

    const handleFormData = (obj) =>{
        setformData((prev)=>{
            return {
                ...prev,
                [obj.target.name]: obj.target.value
            }
        })
        // if(errors !== ''){
        //     setErrors((prev)=> {
        //         return [
        //             obj.err
        //         ]
        //     })
        // }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (errors.length > 0) {
            setErrors(prev => []);
            return;
        }
        try {
            setBusy(true);
            if (mode === "signup") {
                const response = await registerUser(formData)
                if (response.success) {
                    // login(response.records[0])
                    navigate('/login');
                }
            } else {
                const response = await userLogin(formData.email, formData.password)
                if (response.success) {
                    login(response.records[0])
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            console.log(err)
            setApiResponse(err)
        } finally {
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
                        AIP
                    </div>
                    <div className="leading-tight">
                        <p className="text-[15px] font-semibold">AI Portfolio Manager</p>
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
                        <>
                            <div className="space-y-1.5">
                                <InputField
                                    label={{
                                        name: "Username",
                                        className: "block text-xs font-medium text-muted-foreground",
                                    }}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="field"
                                    value={formData.username}
                                    placeholder="maya_okonkwo"
                                    validation={{
                                        required: true,
                                        maxLength: 100,
                                        allowSpace: false
                                    }}
                                    handleInput={(e)=>handleFormData(e)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <InputField
                                    label={{
                                        name: "First name",
                                        className: "block text-xs font-medium text-muted-foreground",
                                    }}
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="field"
                                    value={formData.first_name}
                                    placeholder="Maya"
                                    validation={{
                                        required: true,
                                        maxLength: 100,
                                        allowSpace: true
                                    }}
                                    handleInput={(e)=>handleFormData(e)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <InputField
                                    label={{
                                        name: "Last name",
                                        className: "block text-xs font-medium text-muted-foreground",
                                    }}
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className="field"
                                    value={formData.last_name}
                                    placeholder="Okonkwo"
                                    validation={{
                                        required: true,
                                        maxLength: 100,
                                        allowSpace: true
                                    }}
                                    handleInput={(e)=>handleFormData(e)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <InputField
                                    label={{
                                        name: "Phone",
                                        className: "block text-xs font-medium text-muted-foreground",
                                    }}
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="field"
                                    value={formData.phone}
                                    placeholder="+91-6263829930"
                                    validation={{
                                        required: true,
                                        maxLength: 100,
                                        allowSpace: true
                                    }}
                                    handleInput={(e)=>handleFormData(e)}
                                />
                            </div>
                        </>
                    ) : null}
                    <div className="space-y-1.5">
                        <InputField
                            label={{
                                name: "Email",
                                className: "block text-xs font-medium text-muted-foreground",
                            }}
                            type="text"
                            id="email"
                            name="email"
                            className="field"
                            value={formData.email}
                            placeholder="you@company.com"
                            validation={{
                                required: true,
                                maxLength: 100,
                                allowSpace: false
                            }}
                            handleInput={(e)=>handleFormData(e)}
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
                            value={formData.password}
                            placeholder="••••••••"
                            validation={{
                                required: true,
                                maxLength: 15,
                                allowSpace: false
                            }}
                            handleInput={(e)=>handleFormData(e)}
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
