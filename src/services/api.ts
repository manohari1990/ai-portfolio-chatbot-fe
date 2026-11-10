const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type Owner = { id: string; email: string; displayName: string };
export type Portfolio = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published";
  created_at?: string;
};
export type Session = { token: string; user: Owner };
export type PortfolioDetail = Portfolio & {
  profile: {
    full_name: string;
    headline: string;
    bio: string;
    location: string | null;
    email: string | null;
    website_url: string | null;
  };
  skills: {
    id: string;
    name: string;
    category: string | null;
    proficiency: number | null;
  }[];
  experiences: {
    id: string;
    company: string;
    role: string;
    summary: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
  }[];
  projects: {
    id: string;
    title: string;
    summary: string;
    project_url: string | null;
    repository_url: string | null;
    featured: boolean;
  }[];
};
type AuthResponse = Session & { portfolio?: Portfolio };

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(body?.error ?? "Something went wrong. Please try again.");
  return body as T;
}

export const api = {
  register: (input: { displayName: string; email: string; password: string }) =>
    request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  login: (input: { email: string; password: string }) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  
  signout: (token: string) => 
    request("/api/auth/signout", { method: "POST" }, token),

  portfolios: (token: string) =>
    request<Portfolio[]>("/api/portfolios", {}, token),
  
  portfolio: (portfolioId: string, token: string) =>
    request<PortfolioDetail>(`/api/portfolios/${portfolioId}`, {}, token),
  
  updateProfile: (
    portfolioId: string,
    input: {
      fullName: string;
      headline: string;
      bio: string;
      location?: string | null;
      email?: string | null;
      websiteUrl?: string | null;
    },
    token: string
  ) =>
    request<PortfolioDetail["profile"]>(
      `/api/portfolios/${portfolioId}/profile`,
      { method: "PATCH", body: JSON.stringify(input) },
      token
    ),
  addSkill: (
    portfolioId: string,
    input: { name: string; category?: string; proficiency?: number },
    token: string
  ) =>
    request<PortfolioDetail["skills"][number]>(
      `/api/portfolios/${portfolioId}/skills`,
      { method: "POST", body: JSON.stringify(input) },
      token
    ),
  addExperience: (
    portfolioId: string,
    input: {
      company: string;
      role: string;
      summary?: string;
      startDate: string;
      endDate?: string | null;
      isCurrent?: boolean;
    },
    token: string
  ) =>
    request<PortfolioDetail["experiences"][number]>(
      `/api/portfolios/${portfolioId}/experiences`,
      { method: "POST", body: JSON.stringify(input) },
      token
    ),
  addProject: (
    portfolioId: string,
    input: {
      title: string;
      summary?: string;
      projectUrl?: string | null;
      repositoryUrl?: string | null;
      featured?: boolean;
    },
    token: string
  ) =>
    request<PortfolioDetail["projects"][number]>(
      `/api/portfolios/${portfolioId}/projects`,
      { method: "POST", body: JSON.stringify(input) },
      token
    ),
};
