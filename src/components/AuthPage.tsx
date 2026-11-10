import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {login} = useAuth();

  async function submit(event: FormEvent) {
      event.preventDefault();
      setError("");
      setLoading(true);
      try {
          const session =
            mode === "register"
              ? await api.register({ displayName, email, password })
              : await api.login({ email, password });
            console.log(session, "===================session");
            login(session)
          navigate("/dashboard");
      } catch (reason) {
          setError(
            reason instanceof Error ? reason.message : "Could not continue."
          );
      } finally {
          setLoading(false);
      }
  }
  return (
    <main className="grid min-h-screen bg-[#f7f8fc] lg:grid-cols-2">
      <section className="hidden bg-[#161b36] p-12 text-white lg:flex lg:flex-col">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-400">
            <Sparkles size={18} />
          </span>
          <span className="text-lg font-bold">
            folio<span className="text-violet-300">.</span>
          </span>
        </div>
        <div className="my-auto max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[.15em] text-violet-300">
            Your work, beautifully organized
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight">
            One home for your story and your AI assistant.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Build a portfolio visitors can explore, then let an assistant answer
            questions from your approved knowledge.
          </p>
        </div>
        <p className="text-sm text-slate-400">
          Portfolio OS · Built for independent professionals
        </p>
      </section>
      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
              <Sparkles size={18} />
            </span>
            <span className="text-lg font-bold">
              folio<span className="text-indigo-600">.</span>
            </span>
          </div>
          <p className="text-sm font-semibold text-indigo-600">
            {mode === "register" ? "GET STARTED" : "WELCOME BACK"}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            {mode === "register"
              ? "Create your portfolio workspace"
              : "Sign in to your workspace"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "register"
              ? "Your first portfolio is created automatically."
              : "Use the account you created for your portfolio."}
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "register" && (
              <Field
                label="Your name"
                icon={UserRound}
                value={displayName}
                onChange={setDisplayName}
                placeholder="Alex Morgan"
                autoComplete="name"
              />
            )}
            <Field
              label="Email address"
              icon={Mail}
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />
            <Field
              label="Password"
              icon={LockKeyhole}
              value={password}
              onChange={setPassword}
              placeholder="At least 8 characters"
              type="password"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
            />
            {error && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
                {error}
              </p>
            )}
            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait…"
                : mode === "register"
                  ? "Create workspace"
                  : "Sign in"}{" "}
              <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            {mode === "register" ? "Already have an account?" : "New to folio?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                setError("");
              }}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {mode === "register" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  icon: typeof Mail;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-3 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
        <Icon size={17} className="text-slate-400" />
        <input
          required
          minLength={label === "Password" ? 8 : undefined}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </span>
    </label>
  );
}
