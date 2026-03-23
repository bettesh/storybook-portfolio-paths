import { motion } from "framer-motion";

const About = () => (
  <section className="py-24">
    <div className="container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">About Me</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
          Driven by <span className="text-gradient">Curiosity</span>
        </h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I'm Seam Zaman, a doctoral student dedicated to advancing knowledge in my field. 
            My academic journey has been fueled by an insatiable curiosity and a desire to contribute 
            meaningful research to the global academic community.
          </p>
          <p>
            Throughout my career, I've had the privilege of working on projects that bridge theoretical 
            frameworks with practical applications. I believe the best research doesn't just answer 
            questions—it opens new ones.
          </p>
          <p>
            When I'm not immersed in research, you can find me mentoring students, attending academic 
            conferences, or exploring new ideas that challenge conventional thinking.
          </p>
        </div>

        {/* Skills / Interests */}
        <div className="mt-12">
          <h2 className="font-display font-semibold text-xl text-foreground mb-4">Areas of Interest</h2>
          <div className="flex flex-wrap gap-3">
            {["Research Methodology", "Data Analysis", "Academic Writing", "Machine Learning", "Statistics", "Critical Thinking", "Teaching"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
