// Shared types for admin-managed site content (stored as JSON in the database).

export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  headingPrefix: string;
  headingAccent: string;
  headingSuffix: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface PageHeaderContent {
  badge: string;
  headingPrefix: string;
  headingAccent: string;
  headingSuffix: string;
  intro: string;
}

export interface CtaStripContent {
  heading: string;
  text: string;
  links: (CtaLink & { primary?: boolean })[];
}

export interface AboutProfileContent extends PageHeaderContent {
  bio: string[];
  skillsTitle: string;
  skills: string[];
  cta: {
    heading: string;
    text: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

export interface ServiceStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceSection {
  type: 'paragraphs' | 'bullets' | 'chips' | 'steps';
  title?: string;
  items: string[] | ServiceStep[];
}

export interface CaseStudyServiceTag {
  label: string;
  href: string;
}

export interface CaseStudyHighlight {
  label: string;
  value: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
}
