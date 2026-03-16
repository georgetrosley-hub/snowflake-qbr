"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { AdaptiveLogo } from "@/components/ui/adaptive-logo";

export function WhyGeorge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 sm:space-y-12"
    >
      <SectionHeader
        title="How I Run Enterprise Displacement Deals"
        subtitle="One page for hiring managers"
      />

      {/* Intro */}
      <div className="rounded-2xl border border-surface-border/50 bg-surface-elevated/30 p-5 sm:p-6">
        <p className="text-[14px] leading-relaxed text-text-secondary">
          My background is centered on navigating complex enterprise sales cycles and replacing incumbent vendors in large, regulated organizations. I&apos;ve spent most of my career working inside multi-stakeholder buying environments where success depends on aligning security, IT, compliance, procurement, finance, and executive leadership around a change in platform.
        </p>
      </div>

      {/* Section 1: Experience Displacing Entrenched Vendors */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          Experience Displacing Entrenched Vendors
        </h2>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          A significant portion of my enterprise sales experience involves replacing incumbent platforms that organizations have used for years.
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          This requires reframing the conversation from maintaining the status quo to showing why a new approach delivers measurable operational or risk improvements.
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          In my experience, these have been heavily entrenched legacy vendors — platforms that customers had purchased and relied on for years, if not decades. Displacing them requires patience, executive alignment, and the ability to guide organizations through internal change.
        </p>
      </section>

      {/* Deal framework — scannable playbook */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          How I Run Enterprise Displacement Deals
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-[13px] text-text-secondary">
          <li>Map the full buying committee early (IT, security, GRC, procurement)</li>
          <li>Identify the real decision sponsor</li>
          <li>Align the conversation around measurable risk or operational impact</li>
          <li>Create executive urgency to challenge the incumbent vendor</li>
          <li>Guide the organization through legal, procurement, and vendor transition</li>
        </ul>
      </section>

      {/* Section 2: Navigating Complex Enterprise Buying Committees */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          Navigating Complex Enterprise Buying Committees
        </h2>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Large enterprise purchases rarely involve a single decision maker.
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          My deals typically require coordination across:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-[13px] text-text-secondary">
          <li>IT and security leadership</li>
          <li>Governance, risk, and compliance teams</li>
          <li>Legal and procurement</li>
          <li>Finance and executive leadership</li>
        </ul>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Success often depends on identifying the real decision dynamics inside an organization and aligning each stakeholder around a shared business outcome.
        </p>
      </section>

      {/* Section 3: Operating in Regulated Enterprise Environments */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          Operating in Regulated Enterprise Environments
        </h2>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Much of my experience is in industries where purchasing decisions are heavily influenced by regulation, risk management, and internal governance.
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Examples include healthcare and life sciences organizations such as:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-[13px] text-text-secondary">
          <li>St. Luke&apos;s Health System — $1.65M</li>
          <li>Penn State Health — $1.32M</li>
          <li>Sanofi — $745K</li>
          <li>Tower Health — $373K</li>
        </ul>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          In these environments, navigating compliance, procurement processes, and executive approval structures is often as important as the technology itself.
        </p>
      </section>

      {/* Section 4: Building Enterprise Pipeline from Zero */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          Building Enterprise Pipeline from Zero
        </h2>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Several roles in my career required building enterprise pipeline in largely greenfield territories.
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Examples include:
        </p>
        <p className="text-[13px] font-medium text-text-primary">Verkada</p>
        <ul className="list-disc space-y-1 pl-5 text-[13px] text-text-secondary">
          <li>157% quota attainment</li>
          <li>$6M+ pipeline created</li>
          <li>$1.34M closed in first year</li>
        </ul>
        <p className="mt-3 text-[13px] font-medium text-text-primary">Everpure</p>
        <ul className="list-disc space-y-1 pl-5 text-[13px] text-text-secondary">
          <li>$25M+ pipeline built across primarily whitespace accounts</li>
        </ul>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          This experience taught me how to identify strategic opportunities, build executive relationships, and guide complex deals from initial discovery through procurement and close.
        </p>
      </section>

      {/* Section 5: Founder and Builder Mindset */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          Founder and Builder Mindset
        </h2>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Earlier in my career I founded Lochness Labs, where we raised venture funding, scaled to 150K+ users, and exited through acquisition.
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          That experience shaped how I work inside early-stage companies — collaborating closely with product and engineering, moving quickly, and helping build repeatable sales motion.
        </p>
      </section>

      {/* Closing */}
      <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 sm:p-6">
        <h2 className="text-[15px] font-semibold tracking-tight text-text-primary">
          Why Adaptive
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
          Adaptive is tackling a problem that is becoming increasingly visible at the executive and board level: the impact of AI-driven social engineering attacks on organizations.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
          My experience navigating complex enterprise sales and displacing legacy vendors aligns well with the type of enterprise adoption motion Adaptive is building.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-surface-border/50 bg-surface-elevated/30 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <AdaptiveLogo size={28} />
          <div>
            <p className="font-semibold text-text-primary">If helpful, I&apos;d be happy to walk through how I would approach building pipeline and replacing incumbent platforms across Adaptive&apos;s enterprise accounts.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:george.trosley@gmail.com?subject=Intro%20call%20with%20George%20Trosley"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
          >
            Schedule a call
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://www.adaptivesecurity.com/demo/security-awareness-training"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-elevated px-5 py-2.5 text-[13px] font-medium text-text-secondary transition-colors hover:bg-surface-muted"
          >
            See Adaptive product
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
