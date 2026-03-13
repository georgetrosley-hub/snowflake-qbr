"use client";

import { motion } from "framer-motion";
import {
  Search,
  Users,
  Mail,
  MessageSquare,
  LayoutTemplate,
  Zap,
  ClaudeSparkle,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const steps = [
  {
    id: "1",
    icon: Search,
    title: "Claude scans job postings for AI adoption signals",
    body: "Identify accounts with active AI initiatives, digital transformation mandates, and developer/ops hiring.",
  },
  {
    id: "2",
    icon: Users,
    title: "Claude maps likely champions",
    body: "Use org structure, LinkedIn signals, and account research to identify functional buyers and executive sponsors.",
  },
  {
    id: "3",
    icon: Mail,
    title: "Claude generates outreach",
    body: "Contextual emails and internal-style briefs tailored to the account, wedge, and stakeholder.",
  },
  {
    id: "4",
    icon: MessageSquare,
    title: "Claude simulates objections",
    body: "Prep for security, legal, procurement, and competitive pushback before the meeting.",
  },
  {
    id: "5",
    icon: LayoutTemplate,
    title: "Claude designs pilot structure",
    body: "Scope, success metrics, security path, and expansion thesis — the materials I use to move the deal.",
  },
];

export function TerritoryEngine() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-8 sm:space-y-10"
    >
      <SectionHeader
        title="Claude-powered territory engine"
        subtitle="Claude isn't just the product. It's the tool I use to run territory."
      />

      <div className="rounded-[22px] border border-claude-coral/25 bg-claude-coral/[0.04] p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-claude-coral/15">
            <ClaudeSparkle size={20} className="text-claude-coral" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-text-primary">
              This site is powered by Claude.
            </p>
            <p className="mt-0.5 text-[12px] text-text-muted">
              Ask it how I would land Pfizer or Sanofi. Ask about objections, champion strategy, or pilot design.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[13px] text-text-muted">
          The engine I run to create pipeline and move deals:
        </p>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.3 }}
              className="flex gap-4 rounded-xl border border-surface-border/40 bg-surface-elevated/30 px-4 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-claude-coral/10">
                <Icon className="h-4 w-4 text-claude-coral" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-text-primary">
                  Step {step.id}: {step.title}
                </p>
                <p className="mt-1 text-[12px] text-text-secondary">{step.body}</p>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-text-faint sm:block" />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3">
        <Zap className="h-4 w-4 text-emerald-400" strokeWidth={1.8} />
        <p className="text-[13px] text-text-primary">
          This is how AI-native companies think: use the product to sell the product.
        </p>
      </div>
    </motion.div>
  );
}
