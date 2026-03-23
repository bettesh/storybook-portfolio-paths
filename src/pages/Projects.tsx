import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Research Project Alpha",
    desc: "A comprehensive study exploring novel methodologies in data-driven research, resulting in published findings.",
    tags: ["Research", "Data Analysis", "Python"],
  },
  {
    title: "Academic Publication Beta",
    desc: "Co-authored paper examining emerging trends and their implications for future academic discourse.",
    tags: ["Publication", "Peer Review"],
  },
  {
    title: "Innovation Lab Gamma",
    desc: "Led a cross-disciplinary team to develop a prototype translating theoretical models into practical tools.",
    tags: ["Innovation", "Collaboration", "Prototyping"],
  },
  {
    title: "Teaching Initiative Delta",
    desc: "Designed and implemented a curriculum module that improved student engagement and learning outcomes.",
    tags: ["Teaching", "Curriculum Design"],
  },
];

const Projects = () => (
  <section className="py-24">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Portfolio</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
          Selected <span className="text-gradient">Projects</span>
        </h1>
      </motion.div>

      <div className="grid gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-card border border-border rounded-xl p-6 hover:glow transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
