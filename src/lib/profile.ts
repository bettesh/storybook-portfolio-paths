import { Building2, ExternalLink, GraduationCap, Linkedin } from "lucide-react";

export const EMAIL = "sszama@utu.fi";

export const PROFILES = [
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=R_QWgUUAAAAJ&hl=en", icon: GraduationCap },
  { label: "ORCID", href: "https://orcid.org/0009-0004-0791-6051", icon: ExternalLink },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/seamzaman/", icon: Linkedin },
  { label: "University of Turku", href: "https://www.utu.fi/en/people/seam-zaman", icon: Building2 },
] as const;

// Shown in the footer; update when the site content changes.
export const LAST_UPDATED = "November 2026";
