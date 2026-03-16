"use client";

import { motion } from "framer-motion";
import { ExternalLink, Zap, Users, Target, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SnowflakeLogo } from "@/components/ui/snowflake-logo";

const TIMELINE_HIGHLIGHTS = [
  { date: "Jun 2025", event: "Summit 2025 — AI & apps reframe; Snowflake Intelligence, Openflow, Cortex AISQL" },
  { date: "Nov 2025", event: "Snowflake Intelligence GA, Cortex Agents GA, MCP server GA" },
  { date: "Dec 2025", event: "$200M Anthropic partnership; GPT-5.2 on Cortex AI" },
  { date: "Feb 2026", event: "$200M OpenAI partnership; Cortex Code CLI GA; Observe closed" },
  { date: "Feb 2026", event: "Snowflake Postgres GA; privatelink-only access GA" },
  { date: "Mar 2026", event: "Cortex Code in Snowsight GA; resource budgets for AI" },
];

const BUYER_PERSONAS = [
  "Platform engineering",
  "Data engineering",
  "Analytics engineering",
  "App engineering",
  "AI engineering",
  "Security / governance leaders",
  "Architecture leadership",
];

export function WhyGeorge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 sm:space-y-12"
    >
      <SectionHeader
        title="Why Snowflake, Why Now"
        subtitle="Strategic transition from data platform to governed AI application platform"
        showLogo
      />

      {/* Thesis */}
      <div className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-5 sm:p-6">
        <p className="text-[15px] font-medium leading-relaxed text-text-primary">
          Snowflake is at an inflection point: from data platform to enterprise AI application platform. The roadmap is expanding from data workloads into application, agent, and developer workflows. The bottleneck is shifting from access to execution.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
          Once enterprises can securely bring models to governed data, the next constraint is how fast builders can ship. That is where developer leverage becomes strategic — and where Snowflake’s Cortex Code, Postgres, MCP, and Agents create a growing class of enterprise builders.
        </p>
      </div>

      {/* What changed */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-text-primary">
          <Calendar className="h-4 w-4 text-accent" />
          What changed in the last 12 months
        </h2>
        <ul className="space-y-2">
          {TIMELINE_HIGHLIGHTS.map((item) => (
            <li
              key={`${item.date}-${item.event.slice(0, 30)}`}
              className="flex gap-3 rounded-lg border border-surface-border/40 bg-surface-elevated/30 px-4 py-2.5"
            >
              <span className="shrink-0 text-[11px] font-medium uppercase text-accent/90">{item.date}</span>
              <span className="text-[13px] text-text-secondary">{item.event}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Buyer expansion */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-text-primary">
          <Users className="h-4 w-4 text-accent" />
          Snowflake’s buyer universe is expanding
        </h2>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Not just data leaders anymore. Increasingly relevant personas:
        </p>
        <div className="flex flex-wrap gap-2">
          {BUYER_PERSONAS.map((p) => (
            <span
              key={p}
              className="rounded-md border border-surface-border/50 bg-surface-muted/30 px-3 py-1.5 text-[12px] text-text-secondary"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* GTM implications */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-text-primary">
          <Target className="h-4 w-4 text-accent" />
          GTM implications
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-[13px] text-text-secondary">
          <li>Land-and-expand logic: first workload → platform standardization → AI use cases → developer & app expansion.</li>
          <li>Expansion vector is broadening from analytics into AI, apps, and developer workflows.</li>
          <li>The most strategic deals will be won where technical leverage and enterprise trust meet.</li>
        </ul>
      </section>

      {/* Punchy line */}
      <div className="rounded-2xl border border-surface-border/50 bg-surface-elevated/30 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-medium text-text-primary">
              The value is not just better data or better models. It is compressing the path from governed data to production software. In Snowflake-heavy enterprises, speed only matters if it survives governance.
            </p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="https://www.snowflake.com/en/summit/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
        >
          Snowflake Summit
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://www.snowflake.com/en/product/snowflake-intelligence/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-elevated px-4 py-2 text-[13px] font-medium text-text-primary transition-colors hover:bg-surface-muted"
        >
          Snowflake Intelligence
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://www.snowflake.com/en/product/ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-transparent px-4 py-2 text-[13px] font-medium text-accent transition-colors hover:bg-accent/10"
        >
          AI Data Cloud
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-surface-border/40 bg-surface-muted/20 px-4 py-3">
        <SnowflakeLogo size={20} />
        <p className="text-[12px] text-text-muted">
          Internal GTM · Why Snowflake, Why Now · snowflake.com
        </p>
      </div>
    </motion.div>
  );
}
