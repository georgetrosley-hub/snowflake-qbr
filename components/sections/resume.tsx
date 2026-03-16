"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  Award,
  GraduationCap,
  Target,
  Shield,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const RESUME = {
  name: "George Trosley",
  contact: {
    phone: "215-756-6768",
    email: "george.trosley@gmail.com",
    location: "Pennsylvania & New Jersey",
    linkedIn: "https://www.linkedin.com/in/georgetrosley",
  },
  summary: `Enterprise SaaS seller with $35M+ in career revenue and consistent quota overperformance (118% to 157% across measured periods) specializing in enterprise security and infrastructure platforms sold into regulated industries. Deep experience displacing heavily entrenched legacy vendors — platforms that customers had used for years or decades — by reframing the conversation from status quo to measurable operational and risk improvements. Create executive urgency around emerging security threats while positioning platform consolidation over fragmented point products. Navigate multi-threaded buying cycles across CISO, VP Security, IT, GRC/Compliance, HR/Recruiting and executive leadership.

Proven ability to build pipeline from zero in greenfield territories and convert net-new logos into multi-site platform expansion. Translate executive-level threat urgency (board-level security and compliance concerns) into pipeline by selling measurable risk reduction outcomes rather than training completions. Founder background building and scaling a digital platform to 150K+ users and $45M transaction volume. Deep alignment with founder-led, product-driven cultures scaling from early traction to repeatable enterprise execution.`,
  selectedWins: [
    {
      amount: "$1.65M",
      account: "St. Luke's University Health Network",
      detail: "Enterprise platform agreement across multi-site health system. Displaced legacy incumbent. Security and compliance requirements drove deal urgency.",
    },
    {
      amount: "$1.32M",
      account: "Penn State Health",
      detail: "Enterprise platform across multi-site health system displacing legacy incumbent. Parallel approval tracks across clinical informatics, IT security and procurement. Won by demonstrating measurable risk reduction.",
    },
    {
      amount: "$745K",
      account: "Sanofi",
      detail: "4-layer approval across Platforms, R&D, IT Security and Engineering. Overrode existing vendor mandate through superior product validation and executive sponsorship. 6-site expansion in progress.",
    },
    {
      amount: "$685K",
      account: "AMETEK",
      detail: "Enterprise land with expansion across 20+ subsidiaries. Displaced legacy incumbent through TCO modeling. Replaced fragmented point solutions with single platform.",
    },
    {
      amount: "$373K",
      account: "Tower Health",
      detail: "Net-new logo displacing three legacy incumbent vendors. Four-thread sales motion won through security review alignment and ROI justification.",
    },
  ],
  competencies: [
    "Enterprise Platform Selling",
    "Legacy Vendor Displacement",
    "C-suite, Procurement, Legal, Compliance and IT Selling",
    "Category Creation & Reframing",
    "Greenfield Territory Development",
    "Land-and-Expand",
    "MEDDPICC",
    "ROI / TCO Modeling",
    "Partner Co-Sell",
    "Platform Consolidation",
  ],
  experience: [
    {
      company: "Everpure (formerly Pure Storage)",
      role: "Enterprise Account Executive",
      location: "PA, NJ & DE",
      period: "Aug 2024 – Present",
      bullets: [
        "15 named enterprise accounts across healthcare, pharma and manufacturing. $2.75M annual quota.",
        "Closed $3.34M across 7 deals in FY26 (134% attainment). Average deal size $500K to $1.65M.",
        "On pace at 60% of FY27 quota through Q1. $4M+ active pipeline across named enterprise accounts.",
        "Led competitive takeouts of legacy incumbent vendors by reframing evaluations from point-product features to platform-level risk reduction.",
        "Built $25M+ pipeline from scratch across ~80% whitespace territory by identifying security-driven modernization initiatives.",
        "Evergreen//One StaaS consumption sales: St. Luke's ($1.65M), Penn State Health ($1.32M), AMETEK ($685K).",
        "Advanced deals through 4-layer stakeholder approval (Engineering, IT Security, Procurement, Legal). Multi-threaded across 4 to 6 personas per deal.",
      ],
    },
    {
      company: "Verkada",
      role: "Enterprise Account Executive (SLED)",
      location: "Southern NJ",
      period: "Oct 2023 – Aug 2024",
      bullets: [
        "157% overall attainment. Generated $6M+ pipeline and closed $1.34M in first year.",
        "Closed 6 net-new logos in greenfield territory with no existing pipeline or channel presence.",
        "Sold cloud-managed enterprise security platform into healthcare, corporate and public-sector organizations.",
        "Won deals by selling into security-driven urgency: incident response timelines, threat escalation scenarios and compliance gaps.",
        "Promoted to SLED team lead. Selected for management training based on territory performance and GTM contribution.",
      ],
    },
    {
      company: "OneSpan",
      role: "Enterprise Account Executive",
      location: "North & South Region",
      period: "Nov 2022 – Oct 2023",
      bullets: [
        "127% attainment Q1-Q3; 146% Q3. Closed net-new enterprise SaaS platform agreements.",
        "Sold cloud-based identity verification, fraud prevention and compliance platforms into regulated financial institutions (1,000 to 10,000+ employees).",
        "Sold against legacy authentication and fraud prevention vendors by reframing from point-solution features to platform-level risk reduction.",
        "Designed outbound pipeline motion targeting accounts undergoing vendor consolidation.",
      ],
    },
    {
      company: "Lochness Labs",
      role: "Founder & CEO",
      location: "Philadelphia, PA",
      period: "Nov 2021 – Nov 2022",
      bullets: [
        "Raised $2.5M seed funding. Scaled digital platform to 150K+ users and $45M transaction volume in first 3 months.",
        "Generated $3M revenue in Year 1. Owned product roadmap, GTM strategy and revenue.",
        "Partnered directly with engineering to ship product on aggressive timelines. Exited via private acquisition.",
      ],
    },
    {
      company: "Stryker & Wright Medical",
      role: "Territory Sales Consultant",
      location: "Philadelphia – NJ",
      period: "Mar 2017 – Nov 2021",
      bullets: [
        "120%+ attainment across tenure. President's Club Winner. $4.5M+ annual revenue.",
        "Sold into hospital systems navigating complex adoption cycles, value analysis committees, GPO contracts and capital budget approvals.",
        "Closed $500K+ competitive conversions against entrenched incumbents.",
      ],
    },
    {
      company: "Medartis",
      role: "Territory Sales Consultant",
      location: "NYC – Nashville – Philadelphia",
      period: "May 2013 – Mar 2017",
      bullets: [
        "Ranked #2 nationally. 4x top performance awards. 30 new enterprise accounts in first 10 months.",
        "Converted multiple organizations from entrenched incumbent competitors through technical validation and stakeholder alignment.",
      ],
    },
  ],
  methodology: [
    "MEDDPICC",
    "Challenger Sale / category reframing (awareness from compliance checkbox to behavioral risk reduction)",
    "Security-driven urgency selling (incident response, compliance gaps, board-level security urgency)",
    "Technical pilots and POCs",
    "Enterprise security review processes",
    "Partner ecosystem selling",
    "Signal-based prospecting",
    "Land-and-expand playbooks",
  ],
  education: {
    degree: "B.S., Business Marketing",
    school: "Millersville University of Pennsylvania",
    note: "Scholar Athlete (Golf & Lacrosse)",
  },
};

export function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 sm:space-y-12"
    >
      <SectionHeader
        title="George Trosley"
        subtitle="Enterprise Security Sales — Resume & background for recruiters and hiring managers"
      />

      {/* Contact strip + CTA */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-accent/20 bg-accent/[0.06] p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-text-secondary">
          <a
            href={`mailto:${RESUME.contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {RESUME.contact.email}
          </a>
          <a
            href={`tel:${RESUME.contact.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {RESUME.contact.phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            {RESUME.contact.location}
          </span>
        </div>
        <div className="ml-auto flex flex-wrap gap-3">
          <a
            href={`mailto:${RESUME.contact.email}?subject=Intro%20call%20with%20George%20Trosley`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
          >
            Schedule a call
          </a>
          <a
            href={RESUME.contact.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-elevated px-4 py-2 text-[13px] font-medium text-text-primary transition-colors hover:bg-surface-muted"
          >
            LinkedIn
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.adaptivesecurity.com/demo/security-awareness-training"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-transparent px-4 py-2 text-[13px] font-medium text-accent transition-colors hover:bg-accent/10"
          >
            See Adaptive product
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Summary */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          <Target className="h-4 w-4" />
          Summary
        </h2>
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-text-secondary">
          {RESUME.summary}
        </p>
      </section>

      {/* Selected enterprise wins */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          <Award className="h-4 w-4" />
          Selected enterprise wins
        </h2>
        <ul className="space-y-3">
          {RESUME.selectedWins.map((win) => (
            <li
              key={win.account}
              className="rounded-xl border border-surface-border/60 bg-surface-elevated/50 px-4 py-3"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-semibold text-accent">{win.amount}</span>
                <span className="font-medium text-text-primary">{win.account}</span>
              </div>
              <p className="mt-1 text-[12px] text-text-muted">{win.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Competencies */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          <Shield className="h-4 w-4" />
          Enterprise sales competencies
        </h2>
        <div className="flex flex-wrap gap-2">
          {RESUME.competencies.map((c) => (
            <span
              key={c}
              className="rounded-md border border-surface-border/50 bg-surface-muted/30 px-3 py-1.5 text-[12px] text-text-secondary"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          <Briefcase className="h-4 w-4" />
          Professional experience
        </h2>
        <div className="space-y-6">
          {RESUME.experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="rounded-xl border border-surface-border/50 bg-surface-elevated/30 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-text-primary">{job.company}</h3>
                  <p className="text-[13px] text-accent">{job.role}</p>
                </div>
                <span className="text-[12px] text-text-faint">
                  {job.period} · {job.location}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5 pl-0">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[12px] text-text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology + Education */}
      <div className="grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Sales methodology & tooling
          </h2>
          <ul className="space-y-1.5 text-[12px] text-text-muted">
            {RESUME.methodology.map((m) => (
              <li key={m}>· {m}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
            <GraduationCap className="h-4 w-4" />
            Education
          </h2>
          <p className="font-medium text-text-primary">
            {RESUME.education.degree}
          </p>
          <p className="text-[13px] text-text-secondary">{RESUME.education.school}</p>
          <p className="mt-1 text-[12px] text-text-muted">{RESUME.education.note}</p>
        </section>
      </div>
    </motion.div>
  );
}
