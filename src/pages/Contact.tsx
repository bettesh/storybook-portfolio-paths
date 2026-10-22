import { motion } from "framer-motion";
import { Mail, MapPin, Download, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import cv from "@/assets/Seam_Zaman_CV.pdf.asset.json";

const EMAIL = "sszama@utu.fi";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Contact</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            Interested in AI governance research or collaboration? Get in touch.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-10 text-sm text-muted-foreground">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-primary">
              <Mail className="h-4 w-4 text-primary" /> {EMAIL}
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" /> Turku, Finland
            </span>
            <a href="https://orcid.org/0009-0004-0791-6051" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary">
              <ExternalLink className="h-4 w-4 text-primary" /> ORCID
            </a>
            <a href="https://www.linkedin.com/in/seamzaman/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary">
              <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
            </a>
          </div>

          <Button asChild variant="outline" className="mb-10">
            <a href={cv.url} download="Seam_Zaman_CV.pdf"><Download className="mr-2 h-4 w-4" /> Download CV</a>
          </Button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <Button type="submit" className="w-full glow">Send Message</Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
