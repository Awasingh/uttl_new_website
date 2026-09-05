import { Link } from "@/components/RouterLink";
import { Layout, PageHero } from "@/components/site/Layout";
import { Truck, Ship, Plane, Warehouse, Users, PackageCheck, ArrowRight } from "lucide-react";

const items = [
  { icon: Truck, title: "FTL Vehicle Solutions", desc: "Pan-India full truck load movement with GPS-enabled vehicles selected to match your cargo and route requirements. Choose from closed and open body containers, trailers, ODC and project-load vehicles, with adhoc or dedicated fleet options." },
  { icon: Plane, title: "Air Express", desc: "Fast, secure airfreight for time-sensitive shipments, supported by experienced teams, documentation and paperwork coordination, and a global agent network." },
  { icon: Ship, title: "Sea Freight", desc: "Reliable FCL and LCL forwarding through partnerships with leading ocean carriers, plus local trucking, customs brokerage and flexible ocean rates." },
  { icon: PackageCheck, title: "Surface Express", desc: "Safe, reliable express cargo distribution across India with flexible services and online tracking from pickup through delivery." },
  { icon: Warehouse, title: "Warehousing", desc: "Flexible storage for any duration and volume, supported by professional teams and technology-enabled warehouse spaces for dependable inventory handling." },
  { icon: Users, title: "Manpower Services", desc: "Outsourced manpower solutions, payroll services and third-party management for national and international clients." },
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero eyebrow="OUR SERVICES" title="Logistics Services" subtitle="From full truck load and express cargo to sea freight, warehousing and manpower, UT Trans Logistics connects the services your operation needs." />
      <section className="section-pad">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <article key={s.title} className="bg-card border border-white/5 rounded-xl p-7 hover:border-primary/40 transition">
              <div className="w-14 h-14 rounded-lg bg-primary grid place-items-center mb-5">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl text-white">{s.title}</h2>
              <p className="text-white/70 mt-3 leading-relaxed">{s.desc}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-primary font-semibold hover:gap-3 transition-all">
                Request a quote <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
