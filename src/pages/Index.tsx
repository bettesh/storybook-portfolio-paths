import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

const highlights = [
  { title: "AI Governance", desc: "Studying how firms design oversight, roles and controls for decisions delegated to AI systems." },
  { title: "Systematic Reviews", desc: "Running a PRISMA-based review of organisational AI governance mechanisms with a reproducible protocol." },
  { title: "Data & Analytics", desc: "Structural equation modelling, machine learning and survey research in R and Python." },
];

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div>
      {/* Hero */}
      <section id="home" className="min-h-[90vh] flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Doctoral Researcher · University of Turku
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-light leading-[1.08] text-foreground mb-8">
              Hi, I'm <span className="italic">Seam Zaman</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              I research how organisations govern AI: which decisions are delegated to AI systems, how humans oversee them, and how authority is taken back when needed.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <a href="#research">View Research</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-light text-foreground mb-4">
              What I Do
            </h2>
            <p className="text-muted-foreground max-w-md mb-16">
              Information Systems research at the Turku School of Economics.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="border-t border-border pt-6"
                >
                  <h3 className="font-display text-lg font-medium text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About, Research and Contact as stacked sections */}
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Index;
