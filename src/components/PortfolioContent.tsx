import { useEffect, useState, type FormEvent } from "react";
import { Check, LoaderCircle, Plus, X } from "lucide-react";
import { api, type Portfolio, type PortfolioDetail } from "../services/api";

type ProfileForm = {
  fullName: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  websiteUrl: string;
};
const emptyProfile: ProfileForm = {
  fullName: "",
  headline: "",
  bio: "",
  location: "",
  email: "",
  websiteUrl: "",
};

export function PortfolioContent({
  portfolio,
  token,
  onClose,
}: {
  portfolio: Portfolio;
  token: string;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<PortfolioDetail | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyProfile);
  const [skillName, setSkillName] = useState("");
  const [experienceCompany, setExperienceCompany] = useState("");
  const [experienceRole, setExperienceRole] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .portfolio(portfolio.id, token)
      .then((value) => {
        setDetail(value);
        const profile = value.profile;
        setForm({
          fullName: profile.full_name ?? "",
          headline: profile.headline ?? "",
          bio: profile.bio ?? "",
          location: profile.location ?? "",
          email: profile.email ?? "",
          websiteUrl: profile.website_url ?? "",
        });
      })
      .catch((reason: Error) => setError(reason.message));
  }, [portfolio.id, token]);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    try {
      await api.updateProfile(
        portfolio.id,
        {
          fullName: form.fullName,
          headline: form.headline,
          bio: form.bio,
          location: form.location || null,
          email: form.email || null,
          websiteUrl: form.websiteUrl || null,
        },
        token
      );
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not save profile."
      );
      setStatus("idle");
    }
  }
  async function addSkill(event: FormEvent) {
    event.preventDefault();
    if (!skillName.trim()) return;
    try {
      const skill = await api.addSkill(
        portfolio.id,
        { name: skillName.trim() },
        token
      );
      setDetail((current) =>
        current ? { ...current, skills: [...current.skills, skill] } : current
      );
      setSkillName("");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not add skill."
      );
    }
  }
  async function addExperience(event: FormEvent) {
    event.preventDefault();
    if (!experienceCompany.trim() || !experienceRole.trim()) return;
    try {
      const experience = await api.addExperience(
        portfolio.id,
        {
          company: experienceCompany.trim(),
          role: experienceRole.trim(),
          startDate: new Date().toISOString().slice(0, 10),
          isCurrent: true,
        },
        token
      );
      setDetail((current) =>
        current
          ? { ...current, experiences: [...current.experiences, experience] }
          : current
      );
      setExperienceCompany("");
      setExperienceRole("");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not add experience."
      );
    }
  }
  async function addProject(event: FormEvent) {
    event.preventDefault();
    if (!projectTitle.trim()) return;
    try {
      const project = await api.addProject(
        portfolio.id,
        { title: projectTitle.trim() },
        token
      );
      setDetail((current) =>
        current
          ? { ...current, projects: [...current.projects, project] }
          : current
      );
      setProjectTitle("");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not add project."
      );
    }
  }
  const set = (key: keyof ProfileForm) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="fixed inset-0 z-30 bg-slate-950/25 backdrop-blur-[1px]">
      <aside className="ml-auto flex h-full w-full max-w-3xl flex-col bg-[#f8f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-indigo-600">
              Portfolio content
            </p>
            <h2 className="mt-1 text-xl font-bold">
              Build your public profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {!detail && !error && (
            <div className="grid h-48 place-items-center text-slate-500">
              <LoaderCircle className="animate-spin" />{" "}
            </div>
          )}
          {error && (
            <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </p>
          )}
          {detail && (
            <div className="space-y-7">
              <form
                onSubmit={saveProfile}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">Professional profile</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      This appears at the top of your public portfolio.
                    </p>
                  </div>
                  {status === "saved" && (
                    <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                      <Check size={16} /> Saved
                    </span>
                  )}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    value={form.fullName}
                    onChange={set("fullName")}
                    required
                  />
                  <Input
                    label="Professional headline"
                    value={form.headline}
                    onChange={set("headline")}
                    placeholder="Product designer & strategist"
                  />
                  <Input
                    label="Location"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="Bengaluru, India"
                  />
                  <Input
                    label="Public email"
                    value={form.email}
                    onChange={set("email")}
                    type="email"
                    placeholder="hello@example.com"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Website URL"
                      value={form.websiteUrl}
                      onChange={set("websiteUrl")}
                      type="url"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <label className="sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                      About you
                    </span>
                    <textarea
                      value={form.bio}
                      onChange={(event) => set("bio")(event.target.value)}
                      rows={5}
                      placeholder="Write a concise introduction to your work, experience, and the value you bring."
                      className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    disabled={status === "saving"}
                    className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {status === "saving" ? "Saving…" : "Save profile"}
                  </button>
                </div>
              </form>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold">Skills & expertise</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add skills visitors can discover and your assistant can use.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {detail.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {detail.skills.length === 0 && (
                    <span className="text-sm text-slate-400">
                      No skills added yet.
                    </span>
                  )}
                </div>
                <form onSubmit={addSkill} className="mt-5 flex gap-2">
                  <input
                    value={skillName}
                    onChange={(event) => setSkillName(event.target.value)}
                    placeholder="e.g. React, UI design, Node.js"
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  />
                  <button className="flex shrink-0 items-center gap-1 rounded-xl border border-indigo-200 px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
                    <Plus size={16} /> Add skill
                  </button>
                </form>
              </section>
              <section className="grid gap-4 sm:grid-cols-2">
                <CompactAdd
                  title="Experience"
                  items={detail.experiences.map(
                    (item) => `${item.role} · ${item.company}`
                  )}
                  value={experienceCompany}
                  secondValue={experienceRole}
                  onChange={setExperienceCompany}
                  onSecondChange={setExperienceRole}
                  firstPlaceholder="Company"
                  secondPlaceholder="Role"
                  onSubmit={addExperience}
                />
                <CompactAdd
                  title="Projects"
                  items={detail.projects.map((item) => item.title)}
                  value={projectTitle}
                  onChange={setProjectTitle}
                  firstPlaceholder="Project title"
                  onSubmit={addProject}
                />
              </section>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
      />
    </label>
  );
}
function CompactAdd({
  title,
  items,
  value,
  secondValue,
  onChange,
  onSecondChange,
  firstPlaceholder,
  secondPlaceholder,
  onSubmit,
}: {
  title: string;
  items: string[];
  value: string;
  secondValue?: string;
  onChange: (value: string) => void;
  onSecondChange?: (value: string) => void;
  firstPlaceholder: string;
  secondPlaceholder?: string;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-3 space-y-1">
        {items.map((item) => (
          <p key={item} className="truncate text-sm text-slate-600">
            {item}
          </p>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-slate-400">Nothing added yet.</p>
        )}
      </div>
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <input
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={firstPlaceholder}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
        {onSecondChange && (
          <input
            required
            value={secondValue}
            onChange={(event) => onSecondChange(event.target.value)}
            placeholder={secondPlaceholder}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        )}
        <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
          <Plus size={15} /> Add {title.slice(0, -1)}
        </button>
      </form>
    </section>
  );
}
