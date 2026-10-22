import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GraduationCap, BookOpen, Lightbulb, Mail, MapPin, Download, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import cv from "@/assets/Seam_Zaman_CV.pdf.asset.json";
import portrait from "@/assets/seam-portrait.webp";

const EMAIL = "sszama@utu.fi";

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

const highlights = [
  { icon: GraduationCap, title: "AI Governance", desc: "Studying how firms design oversight, roles and controls for decisions delegated to AI systems." },
  { icon: BookOpen, title: "Systematic Reviews", desc: "Running a PRISMA-based review of organisational AI governance mechanisms with a reproducible protocol." },
  { icon: Lightbulb, title: "Data & Analytics", desc: "Structural equation modelling, machine learning and survey research in R and Python." },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
} as const;

const SectionHeading = ({ kicker, children }: { kicker: string; children: React.ReactNode }) => (
  <motion.div {...fadeUp} className="mb-8 sm:mb-14">
    <div className="flex items-center gap-3 mb-4 sm:mb-5">
      <span className="h-2 w-10 bg-primary" />
      <p className="text-primary text-xs sm:text-sm font-bold tracking-normal uppercase">{kicker}</p>
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase tracking-normal text-foreground leading-none">{children}</h2>
  </motion.div>
);

const Index = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {/* Hero */}
      <section id="home" className="min-h-[calc(85svh-4rem)] md:min-h-[85vh] flex items-stretch py-12 sm:py-16 lg:pb-0">
        <div className="container flex w-full flex-col">
          <div className="grid flex-1 gap-y-0 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-x-14 xl:grid-cols-[minmax(0,1fr)_500px]">


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-start-1 lg:row-start-1"
            >

              <p className="text-primary font-bold text-xs sm:text-sm tracking-normal uppercase mb-5 sm:mb-6 leading-relaxed">
                Doctoral Researcher · University of Turku
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -26, rotate: -0.8 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="lg:col-start-1 lg:row-start-2"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -7, 0], scale: [1, 1.012, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="origin-left"
              >
                <h1 className="text-[2.75rem] min-[360px]:text-5xl sm:text-6xl md:text-8xl font-display font-bold uppercase tracking-normal text-foreground leading-[1.02] md:leading-[0.95] mb-6 sm:mb-8">
                  Hi, I'm <span className="text-gradient block">Seam Zaman</span>
                </h1>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden justify-center lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:flex lg:self-stretch"
            >
              <div aria-hidden className="absolute -left-32 right-6 top-16 bottom-20 bg-primary/25 blur-[90px]" />
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 2.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative flex h-full w-full items-end justify-end"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -7, 0], scale: [1, 1.012, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-full w-full items-end justify-end"
                >
                  <img
                    src={portrait}
                    alt="Portrait of Seam Zaman"
                    draggable={false}
                    className="relative h-full w-auto max-w-none select-none object-contain object-bottom"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-lg lg:col-start-1 lg:row-start-3"
            >


              <p className="text-base sm:text-lg text-muted-foreground mb-7 sm:mb-8 leading-relaxed">
                I research how organisations govern AI: which decisions are delegated to AI systems, how humans oversee them, and how authority is taken back when needed.
              </p>
              <div className="flex flex-col min-[400px]:flex-row gap-3 sm:gap-4">
                <Button asChild className="glow min-h-12 px-5">
                  <a href="#research">
                    View Research <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="min-h-12 px-5">
                  <a href="#contact">Get in Touch</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 sm:py-16 md:py-20 border-t-2 border-border">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="px-5 py-2 md:p-6 border-l-2 border-primary/40"
              >
                <item.icon className="h-7 w-7 text-primary mb-4" strokeWidth={2.5} />
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container max-w-3xl">
          <SectionHeading kicker="About Me">
            Governing <span className="text-gradient">AI in Organisations</span>
          </SectionHeading>

          <motion.div {...fadeUp} className="space-y-6 text-muted-foreground leading-relaxed">
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
          </motion.div>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-5 sm:mb-6">Experience</motion.h3>
          <div className="space-y-6 border-l-2 border-primary pl-4 sm:pl-6">
            {timeline.map((t) => (
              <motion.div key={t.title} {...fadeUp}>
                <p className="text-xs text-primary font-medium">{t.period}</p>
                <h4 className="font-display font-semibold text-foreground">{t.title}</h4>
                <p className="text-sm text-muted-foreground italic">{t.org}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-5 sm:mb-6">Education</motion.h3>
          <div className="space-y-4 border-l-2 border-primary pl-4 sm:pl-6">
            {education.map((e) => (
              <motion.div key={e.title} {...fadeUp}>
                <p className="text-xs text-primary font-medium">{e.period}</p>
                <h4 className="font-display font-semibold text-foreground">{e.title}</h4>
                <p className="text-sm text-muted-foreground italic">{e.org}</p>
              </motion.div>
            ))}
          </div>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-4">Funding & Awards</motion.h3>
          <motion.ul {...fadeUp} className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Doctoral research funding for 2026 from three research projects led by Prof. Matti Mäntymäki.</li>
            <li>UTUGS doctoral researcher funding, University of Turku Graduate School (24 months).</li>
            <li>University of Oulu two-year tuition scholarship, 2023–2025.</li>
          </motion.ul>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-4">Skills & Methods</motion.h3>
          <motion.div {...fadeUp} className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill) => (
              <span key={skill} className="max-w-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-normal text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground transition-colors">
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-4">Languages</motion.h3>
          <motion.p {...fadeUp} className="text-sm text-muted-foreground">Bengali (native) · English (fluent, IELTS 7.0) · Finnish (A2)</motion.p>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container max-w-3xl">
          <SectionHeading kicker="Research">
            Research & <span className="text-gradient">Publications</span>
          </SectionHeading>

          <div className="space-y-7 sm:space-y-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-b-2 border-border pb-7 sm:pb-8 last:border-0"
              >
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-foreground mb-3 leading-snug">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold uppercase tracking-normal px-3 py-1 border border-primary/40 text-primary">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container max-w-3xl">
          <SectionHeading kicker="Contact">
            Let's <span className="text-gradient">Connect</span>
          </SectionHeading>

          <motion.div {...fadeUp} className="relative mb-6 sm:mb-8 lg:hidden">
            <motion.div
              initial={{ opacity: 0, x: -18, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative inline-block"
            >
              <div aria-hidden className="absolute inset-x-0 top-4 bottom-8 bg-primary/30 blur-[45px]" />
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={portrait}
                    alt="Portrait of Seam Zaman"
                    draggable={false}
                    className="w-[120px] max-w-full select-none object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:w-[150px]"
                  />
                  <span className="-mt-3 sm:-mt-4 inline-flex items-center gap-2 border border-primary/50 bg-background/75 px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-normal text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    Say hello <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.p {...fadeUp} className="text-muted-foreground mb-10">

            Interested in AI governance research or collaboration? Get in touch.
          </motion.p>

          <motion.div {...fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mb-8 sm:mb-10 text-sm text-muted-foreground">
            <a href={`mailto:${EMAIL}`} className="flex min-h-11 items-center gap-3 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Mail className="h-4 w-4 text-primary" /> {EMAIL}
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" /> Turku, Finland
            </span>
            <a href="https://orcid.org/0009-0004-0791-6051" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <ExternalLink className="h-4 w-4 text-primary" /> ORCID
            </a>
            <a href="https://www.linkedin.com/in/seamzaman/" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
            </a>
          </motion.div>

          <motion.div {...fadeUp}>
            <Button asChild variant="outline" className="min-h-12 px-5">
              <a href={cv.url} download="Seam_Zaman_CV.pdf"><Download className="mr-2 h-4 w-4" /> Download CV</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
