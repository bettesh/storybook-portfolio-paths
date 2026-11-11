import { EMAIL, LAST_UPDATED, PROFILES } from "@/lib/profile";

const Footer = () => (
  <footer className="border-t-2 border-border py-8 sm:py-10">
    <div className="container flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
        <li>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center hover:text-foreground">
            {EMAIL}
          </a>
        </li>
        {PROFILES.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs">
        © {new Date().getFullYear()} Seam Zaman · Last updated {LAST_UPDATED}
      </p>
    </div>
  </footer>
);

export default Footer;
