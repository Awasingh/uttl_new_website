import { Link } from "@/components/RouterLink";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import {
  Search,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PhoneCall,
  FileDown,
  CircleDot,
} from "lucide-react";

type Milestone = {
  icon: typeof Package;
  status: string;
  location: string;
  time: string;
  done: boolean;
  active?: boolean;
};

type AwbStatus = {
  TxnID: number;
  Sno: string;
  UploadDate: string;
  AwbNumber: string;
  BookingDate: string;
  BookingBranch: string;
  BookingMode: string;
  ConsignorDetails: string;
  ConsigneeDatails: string;
  TotalPkt: string;
  CurrentStatus: string;
  DelayReason: string;
  DeliveryDate: string;
  DueDate: string;
};

const TRACKING_API = `https://uttl.srivota.com/api/Track_awbNo/fetchAwbStatus`;

export default function TrackPage() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<AwbStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const id = tracking.trim().toUpperCase();
    if (id.length < 6) {
      setError("Please enter a valid AWB number (minimum 6 characters).");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(TRACKING_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ AwbNumber: id }),
      });

      if (!response.ok) {
        throw new Error(`Tracking service returned ${response.status}.`);
      }

      const data = (await response.json()) as unknown;
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No shipment was found for this AWB number.");
      }

      setResult(data[0] as AwbStatus);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to fetch shipment status. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const status = result?.CurrentStatus || "Status unavailable";
  const isDelivered = status.toLowerCase() === "delivered";
  const milestones = result ? createMilestones(result) : [];

  return (
    <Layout>
      <PageHero
        eyebrow="LIVE TRACKING"
        title="Track Your Shipment"
        subtitle="Enter your consignment, AWB or booking reference for real-time status, milestones and ETA."
      />

      <section className="pt-4 md:pt-6 pb-14 md:pb-20">
        <div className="container-x">
          <form
            onSubmit={onSubmit}
            className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <label htmlFor="tracking" className="text-sm text-white/80 mb-2 block font-medium">
              Tracking / Consignment Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 bg-[var(--color-topbar)] border border-white/10 rounded-lg px-4 focus-within:border-primary">
                <Search className="w-5 h-5 text-white/50 shrink-0" />
                <input
                  id="tracking"
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder="e.g. UT101277"
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-3.5"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="btn-primary justify-center" disabled={loading}>
                {loading ? "Tracking..." : "Track Now"}
              </button>
            </div>
            {error && <p className="text-destructive text-sm mt-3">{error}</p>}
            <p className="text-white/50 text-xs mt-4">
              Enter one AWB number to view its latest status. Need help?{" "}
              <a href="tel:+911149281919" className="text-primary hover:underline ml-1">Call our support team</a>.
            </p>
          </form>

          {result && (
            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest">Consignment</p>
                    <h2 className="text-2xl text-white mt-1">{result.AwbNumber}</h2>
                    <p className="text-primary font-semibold mt-1">{status}</p>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <button className="btn-outline text-sm !py-2 !px-4">
                      <FileDown className="w-4 h-4" /> POD
                    </button>
                  </div> */}
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Kpi label="Booking branch" value={result.BookingBranch} />
                  <Kpi label="Mode" value={result.BookingMode} />
                  <Kpi label="Booked on" value={result.BookingDate} />
                  <Kpi label={isDelivered ? "Delivered on" : "Due date"} value={isDelivered ? result.DeliveryDate : result.DueDate} highlight />
                </div>

                <div className="mt-8">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: isDelivered ? "100%" : "50%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-white/50 mt-2">
                    <span>{result.BookingBranch}</span>
                    <span>{isDelivered ? "Delivered" : "In progress"}</span>
                  </div>
                </div>

                <ol className="mt-8 relative border-l border-white/10 ml-3 space-y-6">
                  {milestones.map((m) => (
                    <li key={`${m.status}-${m.time}`} className="pl-6 relative">
                      <span
                        className={`absolute -left-[13px] top-0.5 w-6 h-6 rounded-full grid place-items-center ${
                          m.done ? "bg-primary text-primary-foreground" : "bg-white/10 text-white/60"
                        }`}
                      >
                        {m.active ? <CircleDot className="w-4 h-4 animate-pulse" /> : <m.icon className="w-3.5 h-3.5" />}
                      </span>
                      <div className="flex flex-wrap justify-between gap-x-4">
                        <div>
                          <p className={`font-semibold ${m.done ? "text-white" : "text-white/60"}`}>
                            {m.status}
                          </p>
                          <p className="text-white/60 text-sm mt-0.5">{m.location}</p>
                        </div>
                        <p className={`text-sm ${m.active ? "text-primary" : "text-white/50"}`}>{m.time}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="space-y-4">
                <div className="bg-card border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-semibold">Shipment Details</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <Row k="S. No." v={result.Sno} />
                    <Row k="Transaction ID" v={String(result.TxnID)} />
                    <Row k="Upload date" v={result.UploadDate} />
                    <Row k="Total packages" v={result.TotalPkt} />
                    <Row k="Booking date" v={result.BookingDate} />
                    <Row k="Due date" v={result.DueDate} />
                    {isDelivered && <Row k="Delivery date" v={result.DeliveryDate} />}
                    <Row k="Consignor" v={result.ConsignorDetails} />
                    <Row k="Consignee" v={result.ConsigneeDatails} />
                    {result.DelayReason && <Row k="Delay reason" v={result.DelayReason} />}
                  </dl>
                </div>
                <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <PhoneCall className="w-5 h-5" /> Dedicated Support
                  </div>
                  <p className="text-white/80 text-sm mt-2">
                    Speak to a live agent about consignment <strong>{result.AwbNumber}</strong>.
                  </p>
                  <a href="tel:+911149281919" className="btn-primary mt-4 w-full justify-center">
                    Call 011- 49281919
                  </a>
                </div>
              </aside>
            </div>
          )}

          {/* Info tiles */}
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Clear shipment status", desc: "View the latest status, booking date, due date and delivery information available for your AWB." },
              { icon: ShieldCheck, title: "Shipment visibility", desc: "See booking branch, service mode, consignor, consignee and package count in one place." },
              { icon: PhoneCall, title: "Customer support", desc: "Contact our team during support hours for help with an active shipment." },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-white/5 rounded-xl p-6">
                <div className="w-11 h-11 rounded-lg bg-primary/15 grid place-items-center mb-3">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-white font-semibold">{f.title}</h3>
                <p className="text-white/65 text-sm mt-1.5">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/70">
              Don't have a tracking number yet?{" "}
              <Link to="/quote" className="text-primary font-semibold hover:underline">
                Book a shipment
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function createMilestones(shipment: AwbStatus): Milestone[] {
  const delivered = shipment.CurrentStatus.toLowerCase() === "delivered";
  return [
    { icon: CheckCircle2, status: "Booked", location: shipment.BookingBranch, time: shipment.BookingDate, done: true },
    { icon: shipment.BookingMode.toLowerCase().includes("surface") ? Truck : Package, status: "In transit", location: `To ${shipment.ConsigneeDatails}`, time: shipment.UploadDate, done: true, active: !delivered },
    { icon: delivered ? CheckCircle2 : MapPin, status: delivered ? "Delivered" : shipment.CurrentStatus, location: shipment.ConsigneeDatails, time: shipment.DeliveryDate, done: delivered, active: !delivered },
  ];
}

function Kpi({ label, value, highlight }: Readonly<{ label: string; value: string; highlight?: boolean }>) {
  return (
    <div className="bg-[var(--color-topbar)] rounded-lg p-4">
      <p className="text-white/50 text-xs uppercase tracking-widest">{label}</p>
      <p className={`mt-1 font-semibold ${highlight ? "text-primary" : "text-white"}`}>{value}</p>
    </div>
  );
}

function Row({ k, v }: Readonly<{ k: string; v: string }>) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/60">{k}</dt>
      <dd className="text-white text-right">{v}</dd>
    </div>
  );
}
