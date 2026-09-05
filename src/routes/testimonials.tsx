import { Layout, PageHero } from "@/components/site/Layout";
import { Quote, Star } from "lucide-react";

const reviews = [
  { name: "Rahul Mehta", role: "Supply Chain Head, AutoParts India", text: "UT Trans has been our primary inbound logistics partner for 4 years. Their on-time performance is consistently above 98% — unmatched in the industry." },
  { name: "Priya Iyer", role: "Operations Director, MedCare Pharma", text: "Their cold chain handling is world-class. We trust them with shipments worth crores and they have never let us down." },
  { name: "Anand Kapoor", role: "Founder, ShopHive E-commerce", text: "The team gives us practical options for moving time-sensitive cargo and keeps communication clear from pickup through delivery." },
  { name: "Sneha Desai", role: "Procurement Lead, BuildMax Cement", text: "Transparent pricing, real-time tracking, zero damage claims in 18 months. That's the UT Trans difference." },
  { name: "Vikram Singh", role: "CFO, GreenGrocer FMCG", text: "We cut our logistics cost by 22% after moving to UT Trans without sacrificing service levels. Outstanding partnership." },
  { name: "Meera Joshi", role: "GM Logistics, ElectroWorld", text: "Their multi-modal solution simplified our pan-India distribution. One partner, one invoice, one accountable team." },
];

export default function TestimonialsPage() {
  return (
    <Layout>
      <PageHero eyebrow="TESTIMONIALS" title="Trusted logistics partnerships" subtitle="Reliable execution, clear communication and service options shaped around each customer's operation." />
      <section className="section-pad">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name} className="bg-card border border-white/5 rounded-xl p-7 relative">
              <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/15" />
              <div className="flex gap-0.5 text-primary mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-white/85 leading-relaxed">"{r.text}"</p>
              <div className="mt-5 pt-5 border-t border-white/5">
                <div className="font-semibold text-white">{r.name}</div>
                <div className="text-sm text-white/60">{r.role}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
