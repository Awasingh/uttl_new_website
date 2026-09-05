import { Link } from "@/components/RouterLink";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import heroTruck from "@/assets/hero-truck.jpg";
import oceanFreight from "@/assets/ocean-freight.jpg";
import airFreight from "@/assets/air-freight.jpg";
import warehouse from "@/assets/warehouse.jpg";
import { Truck, Ship, Plane, Warehouse, Users, PackageCheck, ShieldCheck, Clock, Globe2, HeadphonesIcon, ArrowRight, ArrowUpRight, CheckCircle2, Search, MapPin } from "lucide-react";

const services = [
  { icon: Truck, title: "FTL Vehicle Solutions", desc: "GPS-enabled vehicles for Pan-India full truck load, from containers and trailers to ODC and project loads.", img: heroTruck },
  { icon: Plane, title: "Air Express", desc: "Time-critical airfreight with documentation support and a trusted global agent network.", img: airFreight },
  { icon: Ship, title: "Sea Freight", desc: "FCL and LCL forwarding with carrier partnerships, trucking and customs brokerage support.", img: oceanFreight },
  { icon: PackageCheck, title: "Surface Express", desc: "Reliable express cargo distribution across India with online tracking from pickup to delivery.", img: heroTruck },
  { icon: Warehouse, title: "Warehousing", desc: "Flexible, technology-enabled storage and inventory handling for any duration and volume.", img: warehouse },
  { icon: Users, title: "Manpower Services", desc: "Outsourced manpower, payroll and third-party management for growing operations.", img: warehouse },
];

const features = [
  { icon: ShieldCheck, title: "100% Cargo Safety", desc: "Insured shipments with end-to-end safety protocols." },
  { icon: Clock, title: "Planned Delivery", desc: "Clear shipment milestones and online tracking to support timely action." },
  { icon: Globe2, title: "Pan-India Network", desc: "Coverage across major Indian cities with domestic and cross-border capability." },
  { icon: HeadphonesIcon, title: "Responsive Support", desc: "Customer support Monday to Saturday, with 24/7 operational assistance." },
];

const industries = ["Automotive", "E-commerce", "FMCG", "Pharmaceuticals", "Manufacturing", "Retail", "Agriculture", "Electronics"];

export default function HomePage() {
  const [trackingId, setTrackingId] = useState("");

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img src={heroTruck} alt="Logistics truck on highway at sunset" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b1220_5%,rgba(11,18,32,.94)_42%,rgba(11,18,32,.35)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#0b1220_0%,transparent_35%)]" />
        </div>
        <div className="relative container-x grid lg:grid-cols-[1.05fr_.75fr] items-center gap-12 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Moving India forward</p>
            <h1 className="text-5xl md:text-7xl leading-[1.02] text-white">
              Logistics that <span className="text-primary">keeps business moving.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
              One accountable partner for road, ocean, air freight and warehousing, built around visibility, reliability and speed.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/services" className="btn-primary">
                Explore our services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-outline">Why UT Trans</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/60">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> GPS-enabled fleet options</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 24/7 operations assistance</span>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 md:p-7 lg:justify-self-end lg:w-full lg:max-w-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Shipment visibility</p>
                <h2 className="mt-2 text-2xl text-white">Track your cargo</h2>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">Get live milestones, ETA updates and delivery confirmation in seconds.</p>
            <form className="mt-6" onSubmit={(event) => { event.preventDefault(); window.history.pushState({}, "", "/track"); window.dispatchEvent(new PopStateEvent("popstate")); }}>
              <label htmlFor="hero-tracking-id" className="sr-only">Consignment or AWB number</label>
              <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 ring-1 ring-white/20 focus-within:ring-primary">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input id="hero-tracking-id" value={trackingId} onChange={(event) => setTrackingId(event.target.value)} placeholder="Enter consignment number" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400" />
                <button type="submit" className="rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-slate-900 hover:text-white transition-colors">Track</button>
              </div>
            </form>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
              <span className="text-white/50">Need a tailored solution?</span>
              <Link to="/quote" className="flex items-center gap-1 font-semibold text-primary hover:text-white">Get a quote <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--color-surface)] border-y border-white/5">
        <div className="container-x grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4 py-8">
          {[
            ["2021", "Founded"],
            ["Pan-India", "Coverage"],
            ["GPS", "Enabled Fleet"],
            ["24/7", "Operations Support"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl text-primary font-bold md:text-4xl">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/55">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-pad">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold tracking-widest text-sm">WHAT WE DO</p>
            <h2 className="text-2xl md:text-2xl mt-3">Services built around your operation</h2>
            <p className="text-white/70 mt-4">
              From first mile to last mile, we move your cargo with precision, transparency and care.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="group bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/40 transition">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-lg bg-primary grid place-items-center">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-white">{s.title}</h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{s.desc}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-pad bg-[var(--color-surface)]">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-primary font-semibold tracking-widest text-sm">WHY CHOOSE US</p>
            <h2 className="text-2xl md:text-2xl mt-3">Built on trust. Driven by performance.</h2>
            <p className="text-white/70 mt-5">
              UT Trans Logistics was incorporated in 2021 to deliver dependable, technology-driven logistics for businesses across India. We combine operational expertise, GPS-enabled movement and responsive customer support to make physical supply chains easier to manage.
            </p>
            <ul className="mt-6 space-y-3">
              {["GPS-enabled vehicles as per requirement", "Adhoc and dedicated fleet options", "Online tracking from pickup to delivery", "Monday to Saturday customer support"].map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
            <Link to="/quote" className="mt-8 inline-flex btn-primary">Get Instant Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-white/5 rounded-xl p-6 hover:border-primary/40 transition">
                <div className="w-12 h-12 rounded-lg bg-primary/15 grid place-items-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg text-white">{f.title}</h3>
                <p className="text-white/65 text-sm mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-pad">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-semibold tracking-widest text-sm">INDUSTRIES</p>
            <h2 className="text-2xl md:text-2xl mt-3">Industries We Serve</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((i) => (
              <div key={i} className="bg-card border border-white/5 rounded-lg py-6 text-center text-white font-medium hover:border-primary hover:text-primary transition">
                {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-orange-500 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl text-primary-foreground">Ready to move your cargo with India's most trusted partner?</h2>
            <p className="text-primary-foreground/85 mt-2">Get a custom quote in under 60 seconds.</p>
          </div>
          <Link to="/quote" className="bg-[var(--color-topbar)] text-white font-semibold px-7 py-4 rounded-lg hover:bg-black transition shrink-0">
            Request Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
