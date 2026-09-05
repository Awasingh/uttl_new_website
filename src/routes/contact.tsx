import { Layout, PageHero } from "@/components/site/Layout";
import { Phone, Mail, MapPin, Clock, Send, Headphones } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Layout>
      <PageHero eyebrow="CUSTOMER SUPPORT" title="Let's move your cargo" subtitle="Tell us what you need to move. Our team will help you choose the right service and respond with practical next steps." />
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-5">
            {[      
              { icon: Phone, title: "Call us", lines: ["011-49281919"] },
              { icon: Mail, title: "Email us", lines: ["info@uttl.in"] },
              { icon: MapPin, title: "Visit us", lines: ["Plot No. K 23/H, Pole No. 001,", " Near Blue Dart, Bamnoli Dwarka Sector 28, New Delhi 110077"] },
              { icon: Clock, title: "Customer support hours", lines: ["Monday – Saturday: 9:30 AM – 6:30 PM", "Prompt communication and timely action"] },
              { icon: Headphones, title: "Operations support", lines: ["24/7 operational assistance", "Support for active shipments"] },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-white/5 rounded-xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary grid place-items-center shrink-0">
                  <c.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{c.title}</h3>
                  {c.lines.map((l) => <p key={l} className="text-white/70 text-sm mt-0.5">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl text-white">Request an Instant Quote</h2>
            <p className="text-white/65 mt-1">Share your requirement and our customer support team will guide you on the right service, vehicle or shipment option.</p>
            {submitted ? (
              <div className="mt-8 bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                <p className="text-primary font-semibold">Thank you! Your request has been received.</p>
                <p className="text-white/70 text-sm mt-1">Our team will reach out to you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="mt-6 grid sm:grid-cols-2 gap-4"
              >
                <Field label="Full Name" name="name" required />
                <Field label="Company" name="company" />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="Origin City" name="origin" />
                <Field label="Destination City" name="destination" />
                <div className="sm:col-span-2">
                  <label htmlFor="details" className="text-sm text-white/80 mb-1.5 block">Shipment Details</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="w-full bg-[var(--color-topbar)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-primary"
                    placeholder="Cargo type, weight, dimensions, preferred mode..."
                  />
                </div>
                <button type="submit" className="sm:col-span-2 btn-primary justify-center">
                  Send Request <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, type = "text", required = false }: Readonly<{ label: string; name: string; type?: string; required?: boolean }>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm text-white/80 mb-1.5 block">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-[var(--color-topbar)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-primary"
      />
    </div>
  );
}
