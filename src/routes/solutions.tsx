import { Layout, PageHero } from "@/components/site/Layout";
import { Route as RouteIcon, BarChart3, Snowflake, ShieldCheck, Boxes, Network } from "lucide-react";

const sols = [
  { icon: RouteIcon, title: "Route Optimization", desc: "AI-powered route planning that cuts transit time and fuel cost." },
  { icon: BarChart3, title: "Real-time Visibility", desc: "Live GPS tracking, ETAs and proactive exception alerts." },
  { icon: Snowflake, title: "Cold Chain", desc: "Reefer fleet and temperature-monitored warehousing for sensitive cargo." },
  { icon: ShieldCheck, title: "Secured Cargo", desc: "Insurance-backed handling, sealed containers and GPS-fenced routes." },
  { icon: Boxes, title: "3PL & 4PL", desc: "Fully managed third-party logistics with KPI-driven SLAs." },
  { icon: Network, title: "Multi-Modal", desc: "Seamless road-rail-sea-air handoffs through one accountable partner." },
];

export default function SolutionsPage() {
  return (
    <Layout>
      <PageHero eyebrow="SOLUTIONS" title="Smart Logistics Solutions" subtitle="Technology, network and people working together to keep your goods on the move." />
      <section className="section-pad">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sols.map((s) => (
            <article key={s.title} className="bg-card border border-white/5 rounded-xl p-7 hover:border-primary/40 transition">
              <div className="w-14 h-14 rounded-lg bg-primary grid place-items-center mb-5">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-xl text-white">{s.title}</h2>
              <p className="text-white/70 mt-3 leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
