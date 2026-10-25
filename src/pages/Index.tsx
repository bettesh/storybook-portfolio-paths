import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, Mail, MapPin, Download, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DelegationSlider, { DELEGATION_FOCUS_EVENT, DELEGATION_SET_EVENT, type DelegationSetDetail } from "@/components/DelegationSlider";
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

type Project = {
  title: string;
  desc: string;
  tags: string[];
  category: "publications" | "thesis" | "course";
};

const projects: readonly Project[] = [
  {
    title: "Understanding Nature-Positive Business Models",
    desc: "Gomes, J. F., Yaraghi, N., Zaman, S., & Ahokangas, P. (2025). Proceedings of the Smart Service Summit 2025 (in press).",
    tags: ["Publication", "Qualitative Study", "Sustainability"],
    category: "publications",
  },
  {
    title: "How AI governance research addresses the failure of human overseers: a systematic literature review",
    desc: "A systematic literature review of how AI governance research addresses the potential failure of human overseers. (In progress)",
    tags: ["AI Governance", "Systematic Review", "Human Oversight"],
    category: "publications",
  },
  {
    title: "Impact of Brand Image on Customer Purchasing Behaviour",
    desc: "Master's thesis (grade 5/5) applying SEM and machine-learning models to 3,600 customer survey responses.",
    tags: ["Thesis", "SEM", "Machine Learning"],
    category: "thesis",
  },
  {
    title: "Predicting Nurses' Stress During COVID-19",
    desc: "Team study using physiological signals, time-window segmentation and gradient-boosted classification with leave-one-group-out cross-validation.",
    tags: ["Machine Learning", "Python"],
    category: "course",
  },
  {
    title: "Reputation and Customer Trust at Osuuskauppa Arina",
    desc: "Designed and ran the member survey, then applied factor analysis and structural equation modelling in R.",
    tags: ["SEM", "Survey Research", "R"],
    category: "course",
  },
];

const strands = [
  {
    num: "01",
    title: "Delegation",
    question: "Which decisions do organisations hand to AI, and why?",
    desc: "Mapping organisational AI governance mechanisms through a PRISMA systematic review and analysis of real AI governance policies.",
    tags: ["Systematic review", "Policy analysis"],
    step: 1,
  },
  {
    num: "02",
    title: "Oversight",
    question: "How does human oversight work in practice, and when does it fail?",
    desc: "A systematic review of how AI governance research addresses the failure of human overseers.",
    tags: ["Systematic review", "In progress"],
    step: 3,
  },
  {
    num: "03",
    title: "Reclaiming authority",
    question: "How is authority taken back when a system must be overridden?",
    desc: "Socio-technical and design science work on override and accountability.",
    tags: ["Socio-technical", "Design science"],
    step: 4,
    override: true,
  },
] as const;

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

type TimelineItem = { period: string; title: string; org: string; desc?: string };

const itemAnim = (i: number) => ({
  initial: { opacity: 0, x: -18 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.5, delay: 0.12 + i * 0.2, ease: "easeOut" },
} as const);

const dotAnim = (i: number) => ({
  initial: { scale: 0, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { delay: 0.18 + i * 0.2, type: "spring", stiffness: 340, damping: 17 },
} as const);

const segAnim = (i: number) => ({
  initial: { scaleY: 0 },
  whileInView: { scaleY: 1 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.32, delay: 0.1 + i * 0.2, ease: "easeInOut" },
} as const);

const Timeline = ({ items }: { items: readonly TimelineItem[] }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div>
      <div className="space-y-7 sm:space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className="relative pl-7 sm:pl-10"
            {...(reduceMotion ? {} : itemAnim(i))}
          >
            {i < items.length - 1 && (
              <motion.span
                aria-hidden
                className="absolute left-[4px] top-[9px] -bottom-[34px] w-0.5 origin-top bg-primary sm:left-[6px] sm:top-[11px] sm:-bottom-[38px]"
                {...(reduceMotion ? {} : segAnim(i))}
              />
            )}
            <motion.span
              aria-hidden
              className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background sm:h-3.5 sm:w-3.5"
              style={{ boxShadow: "0 0 14px hsl(var(--primary) / 0.55)" }}
              {...(reduceMotion ? {} : dotAnim(i))}
            />

            <p className="text-xs text-primary font-medium">{item.period}</p>
            <h4 className="font-display font-semibold text-foreground">{item.title}</h4>
            <p className="text-sm text-muted-foreground italic">{item.org}</p>
            {item.desc && <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>}
          </motion.div>

        ))}
      </div>
    </div>
  );
};


const WordReveal = ({
  text,
  delay = 0,
  className,
  wordClassName,
}: {
  text: string;
  delay?: number;
  className?: string;
  wordClassName?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
        >
          <motion.span
            className={wordClassName ? `inline-block ${wordClassName}` : "inline-block"}
            initial={reduceMotion ? false : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.1 }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const categoryTabs = [
  { id: "publications", label: "Publications & Working Papers" },
  { id: "thesis", label: "Thesis" },
  { id: "course", label: "Course Project" },
] as const;

const ResearchTabs = ({ items }: { items: readonly Project[] }) => {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<Project["category"]>("publications");

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as Project["category"])} className="w-full">
      <TabsList className="flex h-auto w-full flex-wrap items-start justify-start gap-x-7 gap-y-1 rounded-none border-b-2 border-border bg-transparent p-0 sm:gap-x-12">
        {categoryTabs.map((c) => (
          <TabsTrigger
            key={c.id}
            value={c.id}
            className="relative rounded-none border-0 bg-transparent px-0 pb-3 pt-1 font-display text-xs font-bold uppercase tracking-normal text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-base"
          >
            {c.label}
            <span className="ml-2 text-[0.7em] font-semibold opacity-60">
              {items.filter((p) => p.category === c.id).length}
            </span>
            {tab === c.id &&
              (reduceMotion ? (
                <span aria-hidden className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-primary" />
              ) : (
                <motion.span
                  aria-hidden
                  layoutId="research-tab-line"
                  className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-primary"
                  style={{ boxShadow: "0 0 12px hsl(var(--primary) / 0.55)" }}
                />
              ))}
          </TabsTrigger>
        ))}
      </TabsList>

      {categoryTabs.map((c) => (
        <TabsContent key={c.id} value={c.id} className="mt-7 focus-visible:ring-0 sm:mt-9">
          {items
            .filter((p) => p.category === c.id)
            .map((project, i) => (
              <motion.div
                key={project.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : i * 0.08, ease: "easeOut" }}
                className="border-b-2 border-border pb-7 last:border-0 sm:pb-8"
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
        </TabsContent>
      ))}
    </Tabs>
  );
};

const Index = () => {
  const reduceMotion = useReducedMotion();

  // Cursor position over the hero, -0.5..0.5 on each axis; drives the portrait glow and tilt.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-60, 60]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);
  const tiltX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div>
      {/* Hero */}
      <section id="home" onPointerMove={trackPointer} onPointerLeave={resetPointer} className="min-h-[calc(85svh-4rem)] md:min-h-[85vh] flex items-stretch py-12 sm:py-16 lg:pb-0">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl lg:col-start-1 lg:row-start-2"
            >
              <h1 className="text-[2.75rem] min-[360px]:text-5xl sm:text-6xl md:text-8xl font-display font-bold uppercase tracking-normal text-foreground leading-[1.02] md:leading-[0.95] mb-6 sm:mb-8">
                <WordReveal text="Hi, I'm" delay={0.15} className="block" />
                <WordReveal text="Seam Zaman" delay={0.35} className="block" wordClassName="text-gradient" />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden justify-center lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:flex lg:self-stretch"
            >
              <motion.div
                aria-hidden
                className="absolute inset-x-10 top-14 bottom-24 bg-primary/25 blur-[80px]"
                style={{ x: glowX, y: glowY }}
              />
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 2.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative flex h-full w-full items-end justify-center"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -7, 0], scale: [1, 1.012, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
                  className="relative flex max-h-full w-full items-end"
                >
                  <img
                    src={portrait}
                    alt="Portrait of Seam Zaman"
                    draggable={false}
                    className="relative h-auto max-h-full w-full select-none object-contain object-bottom"
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
              <a
                href="#who-decides"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("who-decides")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
                  history.replaceState(null, "", "#who-decides");
                  window.dispatchEvent(new Event(DELEGATION_FOCUS_EVENT));
                }}
                className="group mb-7 sm:mb-8 inline-flex min-h-11 items-center gap-2 text-sm sm:text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>
                  Who should decide: a human or AI?{" "}
                  <span className="text-primary underline decoration-primary/50 underline-offset-4 group-hover:decoration-primary">Try it</span>
                </span>
                <ArrowDown className="h-4 w-4 text-primary transition-transform group-hover:translate-y-0.5" />
              </a>
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

      {/* Who decides? */}
      <section id="who-decides" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container">
          <div className="grid gap-y-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-x-16">
            <div>
              <SectionHeading kicker="Interactive · My research question">
                Who <span className="text-gradient">Decides?</span>
              </SectionHeading>
              <motion.p {...fadeUp} className="-mt-2 sm:-mt-6 mb-8 lg:mb-0 max-w-md text-muted-foreground leading-relaxed">
                This is the question my dissertation asks: how far should organisations delegate decisions to AI, and
                how do they take authority back when it matters? Pick a scenario and drag the slider to see what changes.
              </motion.p>
            </div>
            <motion.div {...fadeUp}>
              <DelegationSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research strands */}
      <section className="pb-14 sm:pb-20 md:pb-24">
        <div className="container">
          <motion.p {...fadeUp} className="mb-6 sm:mb-8 text-xs sm:text-sm font-bold uppercase tracking-normal text-muted-foreground">
            How I'm approaching it<span className="text-primary">*</span>
          </motion.p>
          <div className="grid gap-8 md:grid-cols-3 md:gap-8">
            {strands.map((item, i) => (
              <motion.button
                key={item.num}
                type="button"
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => {
                  document.getElementById("delegation-slider")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
                  window.dispatchEvent(
                    new CustomEvent<DelegationSetDetail>(DELEGATION_SET_EVENT, {
                      detail: { step: item.step, override: "override" in item && item.override },
                    }),
                  );
                }}
                className="group relative flex flex-col border-t-2 border-border pt-6 text-left transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none"
              >
                <span aria-hidden className="absolute -top-[7px] left-0 h-3 w-3 rounded-full border-2 border-primary bg-background transition-shadow group-hover:shadow-[0_0_14px_hsl(var(--primary)/0.6)]" />
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-bold leading-none text-gradient">{item.num}</span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="mb-3 font-display text-base sm:text-lg italic leading-snug text-foreground">{item.question}</p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="border border-primary/40 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-normal text-primary">
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-normal text-muted-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary">
                    Show on slider <ArrowUp className="h-3 w-3" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
          <motion.p {...fadeUp} className="mt-8 sm:mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            <span className="text-primary">*</span> Work in progress. This is an overview of my current understanding and
            direction, not finalised research or findings.
          </motion.p>
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
              I'm S. M. Seam-uz Zaman (Seam Zaman for short), a doctoral researcher in Information Systems Science at the Turku School of
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
          <Timeline items={timeline} />


          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-5 sm:mb-6">Education</motion.h3>
          <Timeline items={education} />


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

          <ResearchTabs items={projects} />
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
            <span className="flex min-h-11 items-center gap-3">
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
              <a href="/downloads/Seam_Zaman_CV.pdf" download="Seam_Zaman_CV.pdf"><Download className="mr-2 h-4 w-4" /> Download CV</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
