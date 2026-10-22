import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = sections.map((s) => s.id);

    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top + window.scrollY <= pos) current = id;
      });
      // At the very bottom, the last section is the one in view.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={() => goTo("home")}
          className="font-display text-xl font-bold tracking-tight text-foreground"
        >
          Seam<span className="text-gradient">.</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => goTo(section.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                active === section.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="container py-4 flex flex-col gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => goTo(section.id)}
                className={`text-left text-sm font-medium ${
                  active === section.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
