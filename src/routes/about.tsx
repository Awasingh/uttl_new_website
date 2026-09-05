import { Link } from "@/components/RouterLink";
import { Layout, PageHero } from "@/components/site/Layout";
import warehouse from "@/assets/warehouse.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <PageHero eyebrow="ABOUT US" title="An integrated logistics partner for India" subtitle="UT Trans Logistics combines domestic transportation, express cargo, freight forwarding, warehousing and value-added services under one accountable partner." />
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col items-start">
            <img src={warehouse} alt="UT Trans Logistics warehouse" loading="lazy"
              width={1024} height={768} className="rounded-2xl border border-white/5" />
              <div className="text-white/75 mt-5 leading-relaxed">
                UT Trans Logistics (UT) was incorporated in 2021 as a wholly owned enterprise with a vision to become a leading integrated logistics solution provider in India. We focus on dependable execution, cost-effective supply chain support and long-term customer partnerships.
              </div>
          </div>
          <div>
            <p className="text-primary font-semibold tracking-widest text-sm">OUR STORY</p>
            <h2 className="text-4xl mt-3">Practical logistics support for complex supply chains.</h2>
            <p className="text-white/70 mt-5">
              Our Pan-India presence covers major cities and supports customers with domestic transportation, express cargo, primary and secondary distribution, cross-border transportation to Nepal and Bangladesh, warehousing, inventory management, door pickup and door delivery.</p>
            <p>We help customers handle the practical challenges of warehouse capacity, staffing, skills, training, equipment and industrial compliance. Our teams shape the service around each customer's cargo, schedule and operating requirements.</p>

            <p>Our core service offerings include:</p>
            <ul className="mt-6 space-y-3">
              {[
                "FTL vehicle solutions with GPS-enabled vehicles, containers, trailers, ODC and project-load capability",
                "Air Express, Sea Freight and Surface Express",
                "Primary and Secondary Distribution",
                "Cross-Border Transportation to Nepal and Bangladesh",
                "Door-to-Door Pickup and Delivery Services",
                "Warehousing and Distribution Solutions",
                "Supply Chain Management and Consulting",
                "Technology-Driven Logistics Solutions",
                "Customized Logistics Solutions for Various Industries",
                "Manpower outsourcing, payroll services and third-party management",
                "Customer support for prompt communication, timely action and practical solutions"
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex btn-primary">Partner With Us <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-surface)]">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            { title: "Our Mission", desc: "To make logistics in India simpler, faster and more transparent — one shipment at a time." },
            { title: "Our Vision", desc: "To be the most trusted logistics partner for businesses building the next India." },
            { title: "Our Values", desc: "Safety first. Customer always. Integrity in every kilometer we drive." },
          ].map((c) => (
            <div key={c.title} className="bg-card border border-white/5 rounded-xl p-7">
              <h3 className="text-xl text-primary">{c.title}</h3>
              <p className="text-white/75 mt-3 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
