import { useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Lightbulb } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

const highlights = [
  { icon: GraduationCap, title: "AI Governance", desc: "Studying how firms design oversight, roles and controls for decisions delegated to AI systems." },
  { icon: BookOpen, title: "Systematic Reviews", desc: "Running a PRISMA-based review of organisational AI governance mechanisms with a reproducible protocol." },
  { icon: Lightbulb, title: "Data & Analytics", desc: "Structural equation modelling, machine learning and survey research in R and Python." },
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
      <section id="home" className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Soft depth */}
        <div className="absolute top-16 right-16 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-16 left-8 w-56 h-56 rounded-full bg-primary/5 blur-3xl" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Doctoral Researcher · University of Turku
            </p>
            <h1 className="text-6xl md:text-8xl font-display leading-[1.02] text-foreground mb-8">
              Hi, I'm <span className="italic text-primary">Seam Zaman</span>
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
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              What I Do
            </h2>
            <p className="text-muted-foreground max-w-md mb-16">
              Information Systems research at the Turku School of Economics.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-3">{item.title}</h3>
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
