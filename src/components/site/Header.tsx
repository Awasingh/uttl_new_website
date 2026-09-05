import { Link, useNavigate } from "@/components/RouterLink";
import { Phone, Mail, Search, LogIn, Calculator, Menu, X, ChevronRight, Globe2 } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About Us" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-black/10">
      {/* Top utility bar */}
      <div className="hidden md:block bg-[var(--color-topbar)] border-b border-white/5 text-sm">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-6 text-white/80">
            <a href="tel:+919711413180" className="flex items-center gap-2 hover:text-primary">
              <Phone className="w-4 h-4 text-primary" /> 011- 49281919
            </a> 
            <a href="mailto:info@uttl.in" className="flex items-center gap-2 hover:text-primary">
              <Mail className="w-4 h-4 text-primary" /> info@uttl.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/track" });
              }}
              className="flex items-center gap-2 bg-white/5 rounded-md pl-3 pr-1 py-1 ring-1 ring-white/10 focus-within:ring-primary/70"
            >
              <Search className="w-4 h-4 text-white/60" />
              <input
                aria-label="Track shipment"
                placeholder="Track Shipment..."
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="bg-transparent outline-none text-white placeholder:text-white/50 w-44"
              />
              <button type="submit" className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded hover:bg-white transition-colors">
                Track
              </button>
            </form>
            <Link to="/crm-login" className="flex items-center gap-1.5 text-white hover:text-primary">
              <LogIn className="w-4 h-4" /> CRM Login
            </Link>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-3 text-white/70">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Globe2 className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[var(--color-topbar)]/95 backdrop-blur border-b border-white/5">
        <div className="container-x flex items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-primary/10 ring-1 ring-primary/30 grid place-items-center">
              <img src="/logo_small.png" alt="UT Trans Logistics logo" className="w-10 h-10" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight text-white">UT Trans Logistics</div>
              <div className="text-xs text-white/60 leading-tight">Better Solution To A Better You</div>
            </div>
          </Link>

          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3.5 py-2 text-white/75 text-sm font-medium rounded hover:text-white hover:bg-white/5 transition"
                activeProps={{ className: "px-3.5 py-2 text-sm font-medium rounded bg-primary text-primary-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/quote" className="hidden md:inline-flex btn-primary text-sm">
              <Calculator className="w-5 h-5" /> Get Instant Quote
            </Link>
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/5 bg-[var(--color-topbar)]">
            <div className="container-x py-3 flex flex-col">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-white/85 hover:text-primary"
                >
                  {n.label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
              <Link to="/track" onClick={() => setOpen(false)} className="px-3 py-2.5 text-white/85 hover:text-primary">
                Track Shipment
              </Link>
              <Link to="/crm-login" onClick={() => setOpen(false)} className="px-3 py-2.5 text-white/85 hover:text-primary">
                CRM Login
              </Link>
              <Link to="/quote" onClick={() => setOpen(false)} className="mt-2 btn-primary justify-center">
                Get Instant Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
