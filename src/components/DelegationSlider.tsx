import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { ArrowRight, RotateCcw } from "lucide-react";

const scenarios = [
  {
    id: "hiring",
    label: "Hiring",
    steps: [
      "A recruiter reads every CV.",
      "AI ranks CVs. A recruiter picks.",
      "AI shortlists. A recruiter signs off.",
      "AI rejects automatically. HR audits monthly.",
      "AI hires. Who notices if it's biased?",
    ],
  },
  {
    id: "loans",
    label: "Loans",
    steps: [
      "A loan officer reviews every application.",
      "AI scores the risk. The officer decides.",
      "AI approves or declines. The officer signs off.",
      "AI decides instantly. A risk team checks samples.",
      "AI lends on its own. Who explains a rejection?",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    steps: [
      "A clinician triages every patient.",
      "AI suggests a priority. The clinician decides.",
      "AI sets the priority. A clinician confirms.",
      "AI triages alone. Clinicians review exceptions.",
      "AI decides who waits. Who is accountable?",
    ],
  },
] as const;

type ScenarioId = (typeof scenarios)[number]["id"];

const MAX = scenarios[0].steps.length - 1;

const Meter = ({ label, level, flash = false }: { label: string; level: number; flash?: boolean }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div>
      <div
        className={`mb-1.5 flex justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-normal transition-colors ${
          flash ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <span>{label}</span>
        <span className={flash ? "text-primary" : "text-foreground"}>{Math.round(level * 100)}%</span>
      </div>
      <motion.div
        className="h-1 w-full bg-secondary"
        animate={
          flash && !reduceMotion
            ? { boxShadow: ["0 0 0 0 hsl(45 95% 55% / 0)", "0 0 14px 2px hsl(45 95% 55% / 0.7)", "0 0 0 0 hsl(45 95% 55% / 0)"] }
            : { boxShadow: "0 0 0 0 hsl(45 95% 55% / 0)" }
        }
        transition={flash ? { duration: 0.8, repeat: 2 } : { duration: 0.2 }}
      >
        <motion.div
          className="h-full origin-left bg-primary"
          animate={{ scaleX: level }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        />
      </motion.div>
    </div>
  );
};

// Dispatched by the hero teaser link so the slider takes focus once it is scrolled to.
export const DELEGATION_FOCUS_EVENT = "delegation:focus";
// Dispatched by the research strand cards to move the slider to a matching step.
export const DELEGATION_SET_EVENT = "delegation:set";
// sweep: walk Human → AI; oversight: jump to step 3 and flash the oversight meter; override: go to AI, then override.
export type DelegationSetDetail = { mode: "sweep" | "oversight" | "override" };

const DelegationSlider = () => {
  const reduceMotion = useReducedMotion();
  const [value, onChange] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [flashOversight, setFlashOversight] = useState(false);
  const reduceRef = useRef(reduceMotion);
  reduceRef.current = reduceMotion;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.6 });
  const [scenarioId, setScenarioId] = useState<ScenarioId>("hiring");
  const [reclaimed, setReclaimed] = useState(false);
  const [rewinding, setRewinding] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hint, setHint] = useState(false);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Nudge the thumb shortly after the slider scrolls into view, until the visitor first interacts.
  useEffect(() => {
    if (touched) {
      setHint(false);
      return;
    }
    if (!inView) return;
    const id = window.setTimeout(() => setHint(true), 1200);
    return () => clearTimeout(id);
  }, [touched, inView]);

  useEffect(() => {
    const focus = () => {
      thumbRef.current?.focus({ preventScroll: true });
      setPulse(true);
      timers.current.push(window.setTimeout(() => setPulse(false), 1600));
    };
    const set = (event: Event) => {
      const { mode } = (event as CustomEvent<DelegationSetDetail>).detail;
      const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setRewinding(false);
      setTouched(true);
      setReclaimed(false);
      setFlashOversight(false);
      setPulse(true);
      later(() => setPulse(false), 1600);
      if (mode === "sweep") {
        if (reduceRef.current) {
          onChange(MAX);
          return;
        }
        onChange(0);
        for (let i = 1; i <= MAX; i++) later(() => onChange(i), i * 1100);
      } else if (mode === "oversight") {
        onChange(3);
        setFlashOversight(true);
        later(() => setFlashOversight(false), 2600);
      } else {
        onChange(MAX);
        later(() => overrideRef.current(), 900);
      }
    };
    window.addEventListener(DELEGATION_FOCUS_EVENT, focus);
    window.addEventListener(DELEGATION_SET_EVENT, set);
    return () => {
      window.removeEventListener(DELEGATION_FOCUS_EVENT, focus);
      window.removeEventListener(DELEGATION_SET_EVENT, set);
    };
  }, []);

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];

  const change = (next: number) => {
    if (rewinding) return;
    // Manual input cancels any card-driven sweep or highlight.
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPulse(false);
    setFlashOversight(false);
    setTouched(true);
    setReclaimed(false);
    onChange(next);
  };

  const override = () => {
    thumbRef.current?.focus();
    const done = () => {
      setRewinding(false);
      setReclaimed(true);
    };
    if (reduceMotion) {
      onChange(0);
      done();
      return;
    }
    setRewinding(true);
    for (let i = 1; i <= MAX; i++) {
      timers.current.push(window.setTimeout(() => onChange(MAX - i), i * 140));
    }
    timers.current.push(window.setTimeout(done, MAX * 140));
  };

  const overrideRef = useRef(override);
  overrideRef.current = override;

  const speed = 0.1 + (value / MAX) * 0.9;
  const oversight = 1 - (value / MAX) * 0.9;

  return (
    <motion.div
      ref={rootRef}
      id="delegation-slider"
      animate={pulse && !reduceMotion ? { boxShadow: ["0 0 0 0 hsl(45 95% 55% / 0)", "0 0 0 6px hsl(45 95% 55% / 0.35)", "0 0 0 0 hsl(45 95% 55% / 0)"] } : undefined}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`border-2 bg-card/40 p-5 transition-colors sm:p-7 ${pulse ? "border-primary" : "border-border"}`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p id="delegation-label" className="text-xs font-bold uppercase tracking-normal text-primary">
          Decision authority
        </p>
        <div role="group" aria-label="Scenario" className="flex gap-1.5">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === scenarioId}
              onClick={() => {
                setTouched(true);
                setReclaimed(false);
                setScenarioId(s.id);
              }}
              className={`min-h-8 border px-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                s.id === scenarioId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-normal text-muted-foreground">
        <span className={value === 0 ? "text-foreground" : undefined}>Human</span>
        <div className="relative w-full">
          <SliderPrimitive.Root
            value={[value]}
            onValueChange={([v]) => change(v)}
            onPointerDown={() => setTouched(true)}
            min={0}
            max={MAX}
            step={1}
            aria-labelledby="delegation-label"
            className="relative flex h-11 w-full touch-none select-none items-center"
          >
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden bg-secondary">
              <SliderPrimitive.Range className="absolute h-full bg-primary" style={{ boxShadow: "0 0 12px hsl(var(--primary) / 0.55)" }} />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb asChild aria-valuetext={scenario.steps[value]}>
              <motion.span
                ref={thumbRef}
                animate={hint && !reduceMotion ? { x: [0, 14, 0, 14, 0] } : { x: 0 }}
                transition={hint ? { duration: 1.4, ease: "easeInOut", repeat: 2, repeatDelay: 3 } : { duration: 0.2 }}
                whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                className="block h-5 w-5 cursor-grab border-2 border-primary bg-background active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{ boxShadow: "0 0 14px hsl(var(--primary) / 0.55)" }}
              />
            </SliderPrimitive.Thumb>
          </SliderPrimitive.Root>
          <AnimatePresence>
            {hint && (
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 pl-1 text-[10px] font-bold normal-case tracking-normal text-primary/80"
              >
                drag →
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span className={value === MAX ? "text-foreground" : undefined}>AI</span>
      </div>

      <div className="mt-2 flex min-h-[5rem] flex-col items-start gap-3 min-[400px]:min-h-14 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
        <div aria-live="polite" className="text-base sm:text-lg leading-snug">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={reclaimed ? "reclaimed" : `${scenarioId}-${value}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {reclaimed ? (
                <>
                  <span className="font-semibold text-primary">Authority reclaimed.</span>{" "}
                  <a
                    href="#research"
                    className="inline-flex items-center gap-1 text-foreground underline decoration-primary/60 underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    See how organisations do this <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </>
              ) : (
                <span className={value === MAX ? "text-foreground" : "text-muted-foreground"}>{scenario.steps[value]}</span>
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {value === MAX && !rewinding && (
            <motion.button
              type="button"
              onClick={override}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-primary bg-primary/10 px-4 text-xs font-bold uppercase tracking-normal text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Override
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6" aria-hidden>
        <Meter label="Speed" level={speed} />
        <Meter label="Human oversight" level={oversight} flash={flashOversight} />
      </div>
    </motion.div>
  );
};

export default DelegationSlider;
