import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { RotateCcw } from "lucide-react";

const delegationSteps = [
  { label: "Human decides", desc: "AI stays out of it." },
  { label: "AI advises", desc: "A human makes the call." },
  { label: "AI decides", desc: "A human approves each decision." },
  { label: "AI decides", desc: "A human monitors and can step in." },
  { label: "AI acts autonomously", desc: "So who takes authority back?" },
] as const;

const MAX = delegationSteps.length - 1;

const DelegationSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const reduceMotion = useReducedMotion();
  const [reclaimed, setReclaimed] = useState(false);
  const [rewinding, setRewinding] = useState(false);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const change = (next: number) => {
    if (rewinding) return;
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

  const step = delegationSteps[value];

  return (
    <div className="mb-7 sm:mb-8 border-l-2 border-primary/40 pl-4 sm:pl-5">
      <p id="delegation-label" className="text-xs font-bold uppercase tracking-normal text-primary mb-4">
        Try it: who decides?
      </p>

      <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-normal text-muted-foreground">
        <span className={value === 0 ? "text-foreground" : undefined}>Human</span>
        <SliderPrimitive.Root
          value={[value]}
          onValueChange={([v]) => change(v)}
          min={0}
          max={MAX}
          step={1}
          aria-labelledby="delegation-label"
          className="relative flex h-11 w-full touch-none select-none items-center"
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" style={{ boxShadow: "0 0 12px hsl(var(--primary) / 0.55)" }} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            ref={thumbRef}
            aria-valuetext={`${step.label}. ${step.desc}`}
            className="block h-5 w-5 cursor-grab border-2 border-primary bg-background transition-transform hover:scale-110 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ boxShadow: "0 0 14px hsl(var(--primary) / 0.55)" }}
          />
        </SliderPrimitive.Root>
        <span className={value === MAX ? "text-foreground" : undefined}>AI</span>
      </div>

      <div className="mt-2 flex min-h-[4.5rem] flex-col items-start gap-3 min-[400px]:min-h-12 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
        <div aria-live="polite" className="text-sm leading-snug">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={reclaimed ? "reclaimed" : value}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {reclaimed ? (
                <>
                  <span className="font-semibold text-primary">Authority reclaimed.</span>{" "}
                  <span className="text-muted-foreground">That's the part I study.</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-foreground">{step.label}.</span>{" "}
                  <span className="text-muted-foreground">{step.desc}</span>
                </>
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
    </div>
  );
};

export default DelegationSlider;
