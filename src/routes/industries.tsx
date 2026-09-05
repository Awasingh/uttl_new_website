import { Layout, PageHero } from "@/components/site/Layout";
import { Car, ShoppingCart, Pill, Factory, Sprout, Cpu, ShoppingBag, Utensils } from "lucide-react";

const industries = [
  { icon: Car, title: "Automotive", desc: "Inbound parts, finished vehicle logistics and aftermarket distribution." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Fulfillment, hyperlocal delivery and reverse logistics at scale." },
  { icon: Pill, title: "Pharmaceuticals", desc: "Temperature-controlled, GDP-compliant pharma cold chain." },
  { icon: Utensils, title: "FMCG", desc: "High-frequency distribution to modern trade and general trade." },
  { icon: Factory, title: "Manufacturing", desc: "Just-in-time inbound and finished-goods outbound logistics." },
  { icon: ShoppingBag, title: "Retail", desc: "Store replenishment, omni-channel and seasonal surge handling." },
  { icon: Sprout, title: "Agriculture", desc: "Bulk agri-commodity movement with farm-to-port solutions." },
  { icon: Cpu, title: "Electronics", desc: "High-value, fragile cargo handling with insurance & security." },
];

export default function IndustriesPage() {
  return (
    <Layout>
      <PageHero eyebrow="INDUSTRIES" title="Industries We Serve" subtitle="Tailored logistics playbooks for the sectors that power India's economy." />
      <section className="section-pad">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <div key={i.title} className="bg-card border border-white/5 rounded-xl p-6 hover:border-primary/40 transition">
              <div className="w-12 h-12 rounded-lg bg-primary/15 grid place-items-center mb-4">
                <i.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg text-white">{i.title}</h2>
              <p className="text-white/65 text-sm mt-2">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
