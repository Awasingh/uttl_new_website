import { Link } from "@/components/RouterLink";
import { Layout, PageHero } from "@/components/site/Layout";
import { useMemo, useState } from "react";
import {
  Truck,
  Ship,
  Plane,
  Warehouse,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Package,
  Calendar,
  User,
  ShieldCheck,
  Zap,
  Clock,
  IndianRupee,
} from "lucide-react";

type Mode = "road" | "ocean" | "air" | "warehouse";
type Service = "standard" | "express" | "premium";

const modeMeta: Record<Mode, { label: string; icon: typeof Truck; desc: string; base: number }> = {
  road: { label: "Road Freight", icon: Truck, desc: "FTL & LTL trucking, pan-India", base: 18 },
  ocean: { label: "Ocean Freight", icon: Ship, desc: "FCL & LCL global shipping", base: 9 },
  air: { label: "Air Freight", icon: Plane, desc: "Express air cargo worldwide", base: 145 },
  warehouse: { label: "Warehousing", icon: Warehouse, desc: "Storage + fulfilment", base: 22 },
};

const serviceMeta: Record<Service, { label: string; multiplier: number; eta: string; icon: typeof Zap }> = {
  standard: { label: "Standard", multiplier: 1, eta: "5–7 days", icon: Clock },
  express: { label: "Express", multiplier: 1.4, eta: "2–3 days", icon: Zap },
  premium: { label: "Premium Guaranteed", multiplier: 1.85, eta: "24–48 hrs", icon: ShieldCheck },
};

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<Mode>("road");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("500");
  const [pieces, setPieces] = useState("5");
  const [cargoType, setCargoType] = useState("General");
  const [service, setService] = useState<Service>("express");
  const [pickupDate, setPickupDate] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [insurance, setInsurance] = useState(true);
  const [done, setDone] = useState(false);

  const estimate = useMemo(() => {
    const w = Math.max(1, Number(weight) || 0);
    const base = modeMeta[mode].base * w * serviceMeta[service].multiplier;
    const ins = insurance ? base * 0.03 : 0;
    const fuel = base * 0.08;
    const total = base + ins + fuel;
    return {
      base: Math.round(base),
      ins: Math.round(ins),
      fuel: Math.round(fuel),
      total: Math.round(total),
    };
  }, [mode, weight, service, insurance]);

  const canNext1 = origin.trim() && destination.trim() && Number(weight) > 0;
  const canNext2 = pickupDate.length > 0;

  function next() {
    setStep((s) => Math.min(3, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email.includes("@") || phone.length < 8) return;
    setDone(true);
  }

  if (done) {
    return (
      <Layout>
        <PageHero eyebrow="ALL SET" title="Quote Confirmed" />
        <section className="section-pad">
          <div className="container-x max-w-2xl">
            <div className="bg-card border border-primary/30 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-primary grid place-items-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl text-white mt-6">Thanks, {name.split(" ")[0] || "there"}!</h2>
              <p className="text-white/70 mt-3">
                We've received your request for a{" "}
                <span className="text-primary font-semibold">{modeMeta[mode].label}</span> shipment from{" "}
                <span className="text-white font-semibold">{origin}</span> to{" "}
                <span className="text-white font-semibold">{destination}</span>. A logistics specialist will
                call <span className="text-white">{phone}</span> during customer support hours with a firm rate and
                pickup slot.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 text-primary font-semibold">
                <IndianRupee className="w-4 h-4" />
                Indicative all-inclusive estimate: ₹ {estimate.total.toLocaleString("en-IN")}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/" className="btn-outline">Back to Home</Link>
                <Link to="/track" className="btn-primary">Track a Shipment <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        eyebrow="INSTANT QUOTE"
        title="Get an all-inclusive freight rate"
        subtitle="Three quick steps. Transparent pricing. No hidden fees."
      />

      {/* <section className="section-pad">
        <div className="container-x grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
           
            <ol className="flex items-center gap-3 mb-8">
              {[
                { n: 1, label: "Shipment" },
                { n: 2, label: "Service" },
                { n: 3, label: "Your Details" },
              ].map((s, i) => (
                <li key={s.n} className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-9 h-9 rounded-full grid place-items-center font-semibold text-sm ${
                      step >= s.n ? "bg-primary text-primary-foreground" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {step > s.n ? <CheckCircle2 className="w-5 h-5" /> : s.n}
                  </div>
                  <span className={`text-sm ${step >= s.n ? "text-white" : "text-white/50"}`}>{s.label}</span>
                  {i < 2 && <div className={`flex-1 h-px ${step > s.n ? "bg-primary" : "bg-white/10"}`} />}
                </li>
              ))}
            </ol>

            <form onSubmit={onSubmit} className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
             
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl text-white flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" /> What are you shipping?
                    </h2>
                    <p className="text-white/60 text-sm mt-1">Choose a mode and add basic cargo details.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(Object.keys(modeMeta) as Mode[]).map((m) => {
                      const M = modeMeta[m];
                      const active = mode === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMode(m)}
                          className={`text-left p-4 rounded-xl border transition ${
                            active
                              ? "border-primary bg-primary/10"
                              : "border-white/10 bg-[var(--color-topbar)] hover:border-white/30"
                          }`}
                        >
                          <M.icon className={`w-6 h-6 ${active ? "text-primary" : "text-white/70"}`} />
                          <p className="text-white font-semibold text-sm mt-3">{M.label}</p>
                          <p className="text-white/50 text-xs mt-1">{M.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextField label="Origin (City / Pincode)" value={origin} onChange={setOrigin} icon={MapPin} placeholder="Mumbai, 400001" />
                    <TextField label="Destination (City / Pincode)" value={destination} onChange={setDestination} icon={MapPin} placeholder="Bengaluru, 560001" />
                    <TextField label="Total Weight (kg)" value={weight} onChange={setWeight} type="number" placeholder="500" />
                    <TextField label="Number of Pieces" value={pieces} onChange={setPieces} type="number" placeholder="5" />
                    <div className="sm:col-span-2">
                      <label className="text-sm text-white/80 mb-1.5 block">Cargo Type</label>
                      <select
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                        className="w-full bg-[var(--color-topbar)] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary"
                      >
                        {["General", "Fragile", "Temperature-controlled", "Hazardous", "Oversized", "High-value"].map(
                          (o) => (
                            <option key={o} value={o}>{o}</option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canNext1}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" /> How fast do you need it?
                    </h2>
                    <p className="text-white/60 text-sm mt-1">Pick a service tier and preferred pickup date.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    {(Object.keys(serviceMeta) as Service[]).map((s) => {
                      const S = serviceMeta[s];
                      const active = service === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setService(s)}
                          className={`text-left p-5 rounded-xl border transition relative ${
                            active
                              ? "border-primary bg-primary/10"
                              : "border-white/10 bg-[var(--color-topbar)] hover:border-white/30"
                          }`}
                        >
                          {s === "express" && (
                            <span className="absolute -top-2 right-3 text-[10px] bg-primary text-primary-foreground font-bold px-2 py-0.5 rounded-full">
                              POPULAR
                            </span>
                          )}
                          <S.icon className={`w-6 h-6 ${active ? "text-primary" : "text-white/70"}`} />
                          <p className="text-white font-semibold mt-3">{S.label}</p>
                          <p className="text-white/60 text-sm mt-1">ETA {S.eta}</p>
                          <p className="text-primary text-sm font-semibold mt-3">
                            × {S.multiplier.toFixed(2)} rate
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextField
                      label="Preferred Pickup Date"
                      value={pickupDate}
                      onChange={setPickupDate}
                      type="date"
                      icon={Calendar}
                    />
                    <label className="flex items-start gap-3 bg-[var(--color-topbar)] border border-white/10 rounded-lg p-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={insurance}
                        onChange={(e) => setInsurance(e.target.checked)}
                        className="w-4 h-4 mt-1 accent-[var(--color-primary)]"
                      />
                      <div>
                        <p className="text-white font-medium text-sm">Add full-value cargo insurance</p>
                        <p className="text-white/55 text-xs mt-0.5">Zero-paperwork claims. 3% of freight.</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prev} className="btn-outline">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canNext2}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> Where should we send the quote?
                    </h2>
                    <p className="text-white/60 text-sm mt-1">
                      A specialist will contact you during customer support hours to confirm.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextField label="Full Name *" value={name} onChange={setName} placeholder="Your Name" />
                    <TextField label="Company" value={company} onChange={setCompany} placeholder="Your Company" />
                    <TextField label="Work Email *" value={email} onChange={setEmail} type="email" placeholder="sales@uttl.in" />
                    <TextField label="Phone *" value={phone} onChange={setPhone} type="tel" placeholder="+91 9711413180" />
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prev} className="btn-outline">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" className="btn-primary">
                      Confirm & Submit <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

         
          <aside className="lg:col-span-1">
            <div className="bg-card border border-white/5 rounded-2xl p-6 sticky top-24">
              <p className="text-primary text-xs font-semibold tracking-widest">LIVE ESTIMATE</p>
              <h3 className="text-3xl text-white mt-2 font-display font-bold">
                ₹ {estimate.total.toLocaleString("en-IN")}
              </h3>
              <p className="text-white/55 text-xs mt-1">All-inclusive, GST extra. Final rate after verification.</p>

              <dl className="mt-6 space-y-2.5 text-sm">
                <Line k={`${modeMeta[mode].label} — ${serviceMeta[service].label}`} v={`₹ ${estimate.base.toLocaleString("en-IN")}`} />
                <Line k="Fuel surcharge (8%)" v={`₹ ${estimate.fuel.toLocaleString("en-IN")}`} />
                {insurance && <Line k="Cargo insurance (3%)" v={`₹ ${estimate.ins.toLocaleString("en-IN")}`} />}
                <div className="border-t border-white/10 pt-2.5 flex justify-between text-white font-semibold">
                  <span>Total</span>
                  <span>₹ {estimate.total.toLocaleString("en-IN")}</span>
                </div>
              </dl>

              <ul className="mt-6 space-y-2 text-xs text-white/60">
                {["No hidden fees", "Free cancellation up to pickup", "GST invoice provided"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section> */}
    </Layout>
  );
}

function TextField({
  label, value, onChange, type = "text", placeholder, icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  icon?: typeof MapPin;
}) {
  return (
    <div>
      <label className="text-sm text-white/80 mb-1.5 block">{label}</label>
      <div className="flex items-center gap-2 bg-[var(--color-topbar)] border border-white/10 rounded-lg px-3 focus-within:border-primary">
        {Icon && <Icon className="w-4 h-4 text-white/50" />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-3"
        />
      </div>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-white/70">
      <span>{k}</span>
      <span className="text-white">{v}</span>
    </div>
  );
}
