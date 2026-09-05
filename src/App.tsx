import { useEffect, useState, type ComponentType } from "react";
import HomePage from "./routes/index";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import CrmLoginPage from "./routes/crm-login";
import IndustriesPage from "./routes/industries";
import QuotePage from "./routes/quote";
import ServicesPage from "./routes/services";
import SolutionsPage from "./routes/solutions";
import TestimonialsPage from "./routes/testimonials";
import TrackPage from "./routes/track";
import { navigateTo } from "./components/RouterLink";

const pages: Record<string, ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/contact": ContactPage,
  "/crm-login": CrmLoginPage,
  "/industries": IndustriesPage,
  "/quote": QuotePage,
  "/services": ServicesPage,
  "/solutions": SolutionsPage,
  "/testimonials": TestimonialsPage,
  "/track": TrackPage,
};

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const Page = pages[path];
  if (!Page) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div>
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <p className="mt-4 text-xl text-foreground">Page not found</p>
          <button className="btn-primary mt-6" onClick={() => navigateTo("/")}>Go home</button>
        </div>
      </main>
    );
  }

  return <Page />;
}