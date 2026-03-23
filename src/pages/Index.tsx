import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="hero-bg min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-primary/5 blur-2xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Doctoral Student & Researcher
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Hi, I'm{" "}
              <span className="text-gradient">Seam Zaman</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-lg mb-8 leading-relaxed">
              Passionate about pushing the boundaries of knowledge through research, innovation, and academic excellence.
            </p>
            <div className="flex gap-4">
              <Button asChild className="glow">
                <Link to="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Get in Touch</Link>
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
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What I Do
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Bridging theory and practice through rigorous research and creative problem-solving.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: "Academic Research", desc: "Conducting cutting-edge research in my doctoral program, contributing to the academic community." },
              { icon: BookOpen, title: "Publications", desc: "Publishing findings in peer-reviewed journals and presenting at international conferences." },
              { icon: Lightbulb, title: "Innovation", desc: "Transforming research insights into practical solutions that make a real-world impact." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-xl p-8 border border-border hover:glow transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
