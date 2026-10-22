import { motion } from "framer-motion";

const timeline = [
  { period: "Jan 2026 – present", title: "Doctoral Researcher, Information Systems Science", org: "Turku School of Economics, University of Turku", desc: "Doctoral Programme in Technology. Supervisors: Prof. Matti Mäntymäki and Matti Minkkinen. Target defence: 2030." },
  { period: "Oct – Dec 2025", title: "Project Researcher", org: "Dept. of Management and Entrepreneurship, University of Turku", desc: "Built an API-based tool collecting dialogue data on AI governance tensions and gathered organisational AI governance policies." },
  { period: "May – Jul 2024", title: "Learning Analytics Intern", org: "Oulu Business School, University of Oulu", desc: "Co-authored the report Advancement of Digitalization in Education and structured a MOOC on Digicampus." },
  { period: "2020 – 2022", title: "Marketing Analyst", org: "Course Platoon, Dhaka", desc: "Market research and analytics supporting strategy and customer acquisition." },
];

const education = [
  { period: "2026 – 2030", title: "Doctoral studies, Information Systems", org: "University of Turku" },
  { period: "2023 – 2025", title: "MSc Business Analytics", org: "Oulu Business School, University of Oulu" },
  { period: "2017 – 2022", title: "BBA in Finance", org: "University of Dhaka, Bangladesh" },
];

const skills = ["Structural Equation Modelling", "Factor Analysis", "Machine Learning", "Systematic Literature Review (PRISMA)", "Qualitative Content Analysis", "Design Science Research", "Human–AI Interaction", "Python", "R", "SPSS", "Power BI", "Tableau"];

const About = () => (
  <section id="about" className="py-24">
    <div className="container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">About Me</p>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-8">
          Governing <span className="italic text-primary">AI in Organisations</span>
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I'm S. M. Seam-uz Zaman (shortly Seam Zaman), a doctoral researcher in Information Systems Science at the Turku School of
            Economics, University of Turku. My dissertation examines how organisations govern the authority they
            delegate to AI systems: which decisions are handed to AI, how human oversight works in practice, and how
            authority is reclaimed when a system must be overridden.
          </p>
          <p>
            The work builds on a systematic literature review of organisational AI governance mechanisms and draws on
            socio-technical and design science perspectives. As AI moves from advisory tools to agentic systems,
            firms need oversight that meets regulation without losing the efficiency that motivated delegation.
          </p>
        </div>

        <h2 className="font-display font-semibold text-xl text-foreground mt-14 mb-6">Experience</h2>
        <div className="space-y-6 border-l border-border pl-6">
          {timeline.map((t) => (
            <div key={t.title}>
              <p className="text-xs text-primary font-medium">{t.period}</p>
              <h3 className="font-display font-semibold text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground italic">{t.org}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display font-semibold text-xl text-foreground mt-14 mb-6">Education</h2>
        <div className="space-y-4 border-l border-border pl-6">
          {education.map((e) => (
            <div key={e.title}>
              <p className="text-xs text-primary font-medium">{e.period}</p>
              <h3 className="font-display font-semibold text-foreground">{e.title}</h3>
              <p className="text-sm text-muted-foreground italic">{e.org}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display font-semibold text-xl text-foreground mt-14 mb-4">Funding & Awards</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Doctoral research funding for 2026 from three research projects led by Prof. Matti Mäntymäki.</li>
          <li>UTUGS doctoral researcher funding, University of Turku Graduate School (24 months).</li>
          <li>University of Oulu two-year tuition scholarship, 2023–2025.</li>
        </ul>

        <h2 className="font-display font-semibold text-xl text-foreground mt-14 mb-4">Skills & Methods</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="px-3.5 py-1.5 rounded-full text-xs tracking-wide text-muted-foreground border border-border">
              {skill}
            </span>
          ))}
        </div>

        <h2 className="font-display font-semibold text-xl text-foreground mt-14 mb-4">Languages</h2>
        <p className="text-sm text-muted-foreground">Bengali (native) · English (fluent, IELTS 7.0) · Finnish (A2)</p>
      </motion.div>
    </div>
  </section>
);

export default About;
