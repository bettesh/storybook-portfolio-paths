import { motion } from "framer-motion";

const projects = [
  {
    title: "How AI governance research addresses the failure of human overseers: a systematic literature review",
    desc: "A systematic literature review on how the potential failure of human overseers is addressed in existing literature review on AI goverance. (In progress)",
    tags: ["AI Governance", "Systematic Review", "Human Oversight"],
  },
  {
    title: "Understanding Nature-Positive Business Models",
    desc: "Gomes, J. F., Yaraghi, N., Zaman, S., & Ahokangas, P. (2025). Proceedings of the Smart Service Summit 2025 (in press).",
    tags: ["Publication", "Qualitative Study", "Sustainability"],
  },
  {
    title: "Predicting Nurses' Stress During COVID-19",
    desc: "Team study using physiological signals, time-window segmentation and gradient-boosted classification with leave-one-group-out cross-validation.",
    tags: ["Machine Learning", "Python"],
  },
  {
    title: "Reputation and Customer Trust at Osuuskauppa Arina",
    desc: "Designed and ran the member survey, then applied factor analysis and structural equation modelling in R.",
    tags: ["SEM", "Survey Research", "R"],
  },
  {
    title: "Brand Image and Purchasing Behaviour",
    desc: "Master's thesis (grade 5/5) applying SEM and machine-learning models to 3,600 customer survey responses.",
    tags: ["Thesis", "SEM", "Machine Learning"],
  },
];

const Projects = () => (
  <section id="research" className="py-24">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Research</p>
        <h2 className="text-4xl md:text-5xl font-display font-light text-foreground mb-12">
          Research & Publications
        </h2>
      </motion.div>

      <div className="grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border-t border-border py-8"
          >
            <h3 className="font-display font-medium text-lg text-foreground mb-3">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] uppercase tracking-widest text-muted-foreground">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
