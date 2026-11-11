import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Download, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

const methods = [
  "Structural equation modelling",
  "Factor analysis",
  "Machine learning",
  "Systematic literature review (PRISMA)",
  "Qualitative content analysis",
  "Design science research",
  "Human–AI interaction",
];

const tools = ["Python", "R", "SPSS", "Power BI", "Tableau"];

type Work = {
  // Year or status, shown in the left margin.
  when: string;
  title: string;
  // Authors, with the site owner's name wrapped in ** to bold it.
  authors?: string;
  venue?: string;
  note?: string;
};

const workGroups: readonly { id: string; heading: string; items: readonly Work[] }[] = [
  {
    id: "publications",
    heading: "Publications & working papers",
    items: [
      {
        when: "In progress",
        title: "How AI governance research addresses the failure of human overseers: a systematic literature review",
        authors: "**Zaman, S.**, Minkkinen, M., & Mäntymäki, M.",
        note: "Working paper. A systematic literature review of how AI governance research addresses the potential failure of human overseers.",
      },
      {
        when: "2025",
        title: "Understanding nature-positive business models",
        authors: "Gomes, J. F., Yaraghi, N., **Zaman, S.**, & Ahokangas, P.",
        venue: "Proceedings of the Smart Service Summit 2025",
        note: "In press.",
      },
    ],
  },
  {
    id: "thesis",
    heading: "Thesis",
    items: [
      {
        when: "MSc thesis",
        title: "Impact of brand image on customer purchasing behaviour",
        venue: "Oulu Business School, University of Oulu",
        note: "Grade 5/5. Structural equation modelling and machine-learning models on 3,600 customer survey responses.",
      },
    ],
  },
  {
    id: "other",
    heading: "Other work",
    items: [
      {
        when: "Course project",
        title: "Predicting nurses' stress during COVID-19",
        note: "Team study using physiological signals, time-window segmentation and gradient-boosted classification with leave-one-group-out cross-validation.",
      },
      {
        when: "Course project",
        title: "Reputation and customer trust at Osuuskauppa Arina",
        note: "Designed and ran the member survey, then applied factor analysis and structural equation modelling in R.",
      },
    ],
  },
];

const strands = [
  {
    num: "01",
    title: "Delegation",
    question: "Which decisions do organisations hand to AI, and why?",
    desc: "Mapping organisational AI governance mechanisms through a PRISMA systematic review and analysis of real AI governance policies.",
    tags: ["Systematic review", "Policy analysis"],
  },
  {
    num: "02",
    title: "Oversight",
    question: "How does human oversight work in practice, and when does it fail?",
    desc: "A systematic review of how AI governance research addresses the failure of human overseers.",
    tags: ["Systematic review", "In progress"],
  },
  {
    num: "03",
    title: "Reclaiming authority",
    question: "How is authority taken back when a system must be overridden?",
    desc: "Socio-technical and design science work on override and accountability.",
    tags: ["Socio-technical", "Design science"],
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
      <span className="h-2 w-10 bg-brand" />
      <p className="text-brand text-xs sm:text-sm font-bold tracking-normal uppercase">{kicker}</p>
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-tight">{children}</h2>
  </motion.div>
);

type TimelineItem = { period: string; title: string; org: string; desc?: string };

const Timeline = ({ items }: { items: readonly TimelineItem[] }) => (
  <div className="space-y-7 sm:space-y-8">
    {items.map((item, i) => (
      <motion.div key={item.title} {...fadeUp} className="relative pl-7 sm:pl-10">
        {i < items.length - 1 && (
          <span
            aria-hidden
            className="absolute left-[4px] top-[9px] -bottom-[34px] w-0.5 bg-brand/40 sm:left-[6px] sm:top-[11px] sm:-bottom-[38px]"
          />
        )}
        <span
          aria-hidden
          className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-brand bg-background sm:h-3.5 sm:w-3.5"
        />
        <p className="text-sm text-brand font-medium">{item.period}</p>
        <h4 className="font-display text-lg font-semibold text-foreground">{item.title}</h4>
        <p className="text-[0.9375rem] text-muted-foreground italic">{item.org}</p>
        {item.desc && <p className="text-[0.9375rem] leading-relaxed text-muted-foreground mt-1">{item.desc}</p>}
      </motion.div>
    ))}
  </div>
);

// Renders "A, **B**, & C" with the ** part in bold.
const Authors = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, i) =>
      i % 2 ? (
        <strong key={i} className="font-semibold text-foreground">
          {part}
        </strong>
      ) : (
        part
      ),
    )}
  </>
);

const WorkList = () => {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState(workGroups[0].id);

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="flex h-auto w-full flex-wrap items-start justify-start gap-x-8 gap-y-1 rounded-none border-b-2 border-border bg-transparent p-0 sm:gap-x-10">
        {workGroups.map((group) => (
          <TabsTrigger
            key={group.id}
            value={group.id}
            className="relative rounded-none border-0 bg-transparent px-0 pb-3 pt-1 font-display text-base font-semibold text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none sm:text-lg"
          >
            {group.heading}
            <span className="ml-2 font-body text-xs font-medium text-muted-foreground">{group.items.length}</span>
            {tab === group.id &&
              (reduceMotion ? (
                <span aria-hidden className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-brand" />
              ) : (
                <motion.span aria-hidden layoutId="research-tab-line" className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-brand" />
              ))}
          </TabsTrigger>
        ))}
      </TabsList>

      {workGroups.map((group) => (
        <TabsContent key={group.id} value={group.id} className="mt-2 focus-visible:ring-0">
          <ol>
            {group.items.map((item) => (
              <li key={item.title} className="grid gap-x-6 gap-y-1 border-b border-border py-5 last:border-0 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:py-6">
                <p className="text-sm font-medium text-brand sm:pt-1">{item.when}</p>
                <div>
                  <p className="font-display text-lg sm:text-xl font-semibold leading-snug text-foreground">{item.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.authors && (
                      <>
                        <Authors text={item.authors} />{" "}
                      </>
                    )}
                    {item.venue && <em>{item.venue}. </em>}
                    {item.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const Index = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {/* Hero */}
      <section id="home" className="min-h-[calc(85svh-4rem)] md:min-h-[85vh] flex items-stretch py-12 sm:py-16 lg:pb-0">
        <div className="container flex w-full flex-col">
          <div className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_26.25rem] lg:gap-x-14 xl:grid-cols-[minmax(0,1fr)_31.25rem]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl self-center lg:pb-16"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-foreground leading-[1.05]">
                Seam Zaman
              </h1>
              <p className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl text-foreground">Doctoral Researcher in AI Governance</p>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
                Information Systems Science · Turku School of Economics, University of Turku
              </p>
              <span aria-hidden className="mt-7 sm:mt-8 block h-0.5 w-12 bg-brand" />

              <p className="mt-7 sm:mt-8 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
                I research how organisations govern AI: which decisions are delegated to AI systems, how humans oversee them, and how authority is taken back when needed.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-col min-[400px]:flex-row gap-3 sm:gap-4">
                <Button asChild className="min-h-12 px-5">
                  <a href="#research">
                    View Research <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="min-h-12 px-5">
                  <a href="#contact">Get in Touch</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative hidden items-end justify-center lg:flex lg:self-stretch"
            >
              <img
                src={portrait}
                alt="Portrait of Seam Zaman"
                draggable={false}
                className="h-auto max-h-full w-full select-none object-contain object-bottom"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research focus */}
      <section id="focus" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container">
          <SectionHeading kicker="Research focus">
            What I <span className="text-gradient">Study</span>
          </SectionHeading>
          <motion.p {...fadeUp} className="-mt-2 sm:-mt-6 mb-10 sm:mb-14 max-w-2xl text-muted-foreground leading-relaxed">
            My dissertation asks how far organisations should delegate decisions to AI, and how they take authority
            back when it matters. I approach it through three questions.<span className="text-brand">*</span>
          </motion.p>
          <div className="grid gap-8 md:grid-cols-3 md:gap-8">
            {strands.map((item, i) => (
              <motion.article
                key={item.num}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col border-t-2 border-border pt-6"
              >
                <span aria-hidden className="absolute -top-[7px] left-0 h-3 w-3 rounded-full border-2 border-brand bg-background" />
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-semibold leading-none text-gradient">{item.num}</span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="mb-3 font-display text-base sm:text-lg italic leading-snug text-foreground">{item.question}</p>
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.desc}</p>
                <p className="mt-auto text-sm text-muted-foreground">{item.tags.join(" · ")}</p>
              </motion.article>
            ))}
          </div>
          <motion.p {...fadeUp} className="mt-8 sm:mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            <span className="text-brand">*</span> Work in progress. This is an overview of my current understanding and
            direction, not finalised research or findings.
          </motion.p>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container max-w-3xl">
          <SectionHeading kicker="Research">
            Research & <span className="text-gradient">Publications</span>
          </SectionHeading>

          <WorkList />
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
          <motion.ul {...fadeUp} className="list-disc pl-5 space-y-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
            <li>Doctoral research funding for 2026 from three research projects led by Prof. Matti Mäntymäki.</li>
            <li>UTUGS doctoral researcher funding, University of Turku Graduate School (24 months).</li>
            <li>University of Oulu two-year tuition scholarship, 2023–2025.</li>
          </motion.ul>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-4">Skills & Methods</motion.h3>
          <motion.dl {...fadeUp} className="grid gap-x-10 gap-y-6 text-[0.9375rem] sm:grid-cols-2">
            <div>
              <dt className="mb-2 text-sm font-medium text-brand">Methods</dt>
              <dd>
                <ul className="space-y-1.5 text-muted-foreground">
                  {methods.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-sm font-medium text-brand">Tools</dt>
              <dd>
                <ul className="space-y-1.5 text-muted-foreground">
                  {tools.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </motion.dl>

          <motion.h3 {...fadeUp} className="font-display font-semibold text-xl text-foreground mt-10 sm:mt-14 mb-4">Languages</motion.h3>
          <motion.p {...fadeUp} className="text-[0.9375rem] text-muted-foreground">Bengali (native) · English (fluent, C1) · Finnish (A2)</motion.p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-14 sm:py-20 md:py-24 border-t-2 border-border">
        <div className="container max-w-3xl">
          <SectionHeading kicker="Contact">
            Let's <span className="text-gradient">Connect</span>
          </SectionHeading>

          <motion.div {...fadeUp} className="relative mb-6 sm:mb-8 lg:hidden">
            <div className="relative inline-block">
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
            </div>
          </motion.div>

          <motion.p {...fadeUp} className="text-muted-foreground mb-10">

            Interested in AI governance research or collaboration? Get in touch.
          </motion.p>

          <motion.div {...fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mb-8 sm:mb-10 text-sm text-muted-foreground">
            <a href={`mailto:${EMAIL}`} className="flex min-h-11 items-center gap-3 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Mail className="h-4 w-4 text-brand" /> {EMAIL}
            </a>
            <span className="flex min-h-11 items-center gap-3">
              <MapPin className="h-4 w-4 text-brand" /> Turku, Finland
            </span>
            <a href="https://orcid.org/0009-0004-0791-6051" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <ExternalLink className="h-4 w-4 text-brand" /> ORCID
            </a>
            <a href="https://www.linkedin.com/in/seamzaman/" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Linkedin className="h-4 w-4 text-brand" /> LinkedIn
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
