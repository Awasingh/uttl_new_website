import { Link } from "@/components/RouterLink";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LineChart,
  PackageSearch,
  Users,
  Truck,
  KeyRound,
} from "lucide-react";

export default function CrmLoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@") || pw.length < 6) {
      setError("Please enter a valid email and a password of at least 6 characters.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setError("Portal is currently in maintenance. Please contact your account manager.");
    }, 900);
  }

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
        {/* Brand / benefits panel */}
        <aside className="hidden lg:flex flex-col justify-between bg-[var(--color-topbar)] border-r border-white/5 p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-primary grid place-items-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white leading-tight">UT Trans Logistics</div>
                <div className="text-xs text-white/60">Client Command Center</div>
              </div>
            </Link>
          </div>

          <div className="relative">
            <p className="text-primary font-semibold tracking-widest text-xs">CLIENT PORTAL</p>
            <h1 className="text-4xl xl:text-5xl text-white mt-3 leading-tight">
              Your entire supply chain — in one secure workspace.
            </h1>
            <p className="text-white/70 mt-4 max-w-md">
              Real-time visibility on every consignment, one-click invoicing, downloadable PODs, and analytics
              that help you cut freight cost quarter over quarter.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: PackageSearch, title: "Live shipment control", desc: "Track, hold, re-route or expedite any consignment in seconds." },
                { icon: LineChart, title: "Freight analytics", desc: "Lane costs, on-time %, dwell time — all benchmarked automatically." },
                { icon: Users, title: "Team access", desc: "Role-based permissions for ops, finance and procurement teams." },
              ].map((b) => (
                <li key={b.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 grid place-items-center shrink-0">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{b.title}</p>
                    <p className="text-white/60 text-sm">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center gap-2 text-white/50 text-xs">
            <ShieldCheck className="w-4 h-4 text-primary" />
            SOC 2 Type II • ISO 27001 • 256-bit TLS everywhere
          </div>
        </aside>

        {/* Login form */}
        <div className="flex items-center justify-center p-6 md:p-12 bg-background">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 text-center">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary grid place-items-center">
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-white">UT Trans Logistics</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-primary text-xs font-semibold">
              <LogIn className="w-3.5 h-3.5" /> Secure Sign In
            </div>
            <h2 className="text-3xl md:text-4xl text-white mt-4">Welcome back</h2>
            <p className="text-white/60 mt-2">
              Sign in to your CRM to manage shipments, invoices and reports.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="text-sm text-white/80 mb-1.5 block">
                  Work Email
                </label>
                <div className="flex items-center gap-2 bg-[var(--color-topbar)] border border-white/10 rounded-lg px-3 focus-within:border-primary">
                  <Mail className="w-4 h-4 text-white/50" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-sm text-white/80">Password</label>
                  <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="flex items-center gap-2 bg-[var(--color-topbar)] border border-white/10 rounded-lg px-3 focus-within:border-primary">
                  <Lock className="w-4 h-4 text-white/50" />
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="text-white/50 hover:text-white p-1"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-white/70 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                Keep me signed in on this device
              </label>

              {error && (
                <p className="text-destructive text-sm bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-primary w-full justify-center" disabled={submitting}>
                {submitting ? "Signing in..." : (<>Sign In <LogIn className="w-4 h-4" /></>)}
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-3 text-xs text-white/50">OR</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-topbar)] border border-white/10 rounded-lg py-3 text-white hover:border-primary/50 transition"
              >
                <KeyRound className="w-4 h-4 text-primary" /> Sign in with SSO
              </button>
            </form>

            <p className="mt-6 text-sm text-white/60 text-center">
              New to UT Trans Logistics?{" "}
              <Link to="/quote" className="text-primary font-semibold hover:underline">
                Request an account
              </Link>
            </p>
            <p className="mt-3 text-[11px] text-white/40 text-center">
              Protected by reCAPTCHA. By signing in you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
