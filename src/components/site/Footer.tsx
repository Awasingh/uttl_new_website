import { Link } from "@/components/RouterLink";
import { Phone, Mail, MapPin, Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--color-topbar)] border-t border-white/5 mt-20">
      <div className="container-x py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-lg   grid place-items-center">
              {/* <Truck className="w-6 h-6 text-primary-foreground" /> */}
               <img src="logo_small.png" alt="UT Trans Logistics logo" className="w-10 h-10" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-white">UT Trans Logistics</div>
              <div className="text-xs text-white/60">Better Solution To A Better You</div>
            </div>
          </Link>
          <p className="text-white/70 text-sm leading-relaxed">
            UT Trans Logistics provides dependable freight, express cargo, warehousing and workforce solutions for customers across India.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/5 grid place-items-center text-white/70 hover:bg-primary hover:text-primary-foreground"><Globe2 className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-display text-lg mb-5">Quick Links</h3>
          <ul className="space-y-2.5 text-white/70 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/industries" className="hover:text-primary">Industries</Link></li>
            <li><Link to="/solutions" className="hover:text-primary">Solutions</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-display text-lg mb-5">Our Services</h3>
          <ul className="space-y-2.5 text-white/70 text-sm">
            <li>FTL Vehicle Solutions</li>
            <li>Ocean Freight</li>
            <li>Air Freight</li>
            <li>Warehousing</li>
            <li>Surface Express</li>
            <li>Manpower Services</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-display text-lg mb-5">Get In Touch</h3>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex gap-3"><MapPin className="w-5 h-5 text-primary shrink-0" /> Plot No. K 23/H, Pole No. 001, Near Blue Dart, Bamnoli Dwarka Sector 28, New Delhi 110077</li>
            <li className="flex gap-3"><Phone className="w-5 h-5 text-primary shrink-0" /> <a href="tel:+919711413180" className="hover:text-primary">011- 49281919</a></li>
            <li className="flex gap-3"><Mail className="w-5 h-5 text-primary shrink-0" /> <a href="mailto:info@uttl.in" className="hover:text-primary">info@uttl.in</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between text-sm text-white/60 gap-2">
          <p>© {new Date().getFullYear()} UT Trans Logistics. All rights reserved.</p>
          <p>Designed:</p>
        </div>
      </div>
    </footer>
  );
}
