"use client";

import { motion } from "framer-motion";
import { Shield, Check, Minus } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

type Strength = "strong" | "strongest" | "moderate" | "improving" | "unknown";

const rows: {
  factor: string;
  adaptive: Strength;
  knowbe4: Strength;
  cofense: Strength;
  proofpoint?: Strength;
}[] = [
  {
    factor: "Deepfake & AI-generated threat training",
    adaptive: "strongest",
    knowbe4: "moderate",
    cofense: "moderate",
    proofpoint: "improving",
  },
  {
    factor: "Microlearning & engagement (TikTok-style)",
    adaptive: "strongest",
    knowbe4: "moderate",
    cofense: "moderate",
    proofpoint: "moderate",
  },
  {
    factor: "Phishing simulation + just-in-time learning",
    adaptive: "strong",
    knowbe4: "strong",
    cofense: "strong",
    proofpoint: "strong",
  },
  {
    factor: "Always-fresh content & automation",
    adaptive: "strong",
    knowbe4: "moderate",
    cofense: "moderate",
    proofpoint: "moderate",
  },
  {
    factor: "Security culture vs checkbox compliance",
    adaptive: "strong",
    knowbe4: "moderate",
    cofense: "moderate",
    proofpoint: "unknown",
  },
];

function StrengthBadge({ s }: { s: Strength }) {
  if (s === "strongest") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
        <Check className="h-3 w-3" strokeWidth={2.5} />
        strongest
      </span>
    );
  }
  if (s === "strong") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-400/90">
        <Check className="h-3 w-3" strokeWidth={2.5} />
        strong
      </span>
    );
  }
  if (s === "improving") {
    return (
      <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-400/90">
        improving
      </span>
    );
  }
  if (s === "moderate") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-text-muted">
        <Minus className="h-3 w-3" strokeWidth={2} />
        moderate
      </span>
    );
  }
  return (
    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-text-faint">
      unknown
    </span>
  );
}

export function EnterpriseComparison() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-8 sm:space-y-10"
    >
      <SectionHeader
        title="Adaptive vs Alternatives"
        subtitle="Security awareness buying decisions — deepfake training, engagement, and security culture. Not checkbox compliance."
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-[13px]">
          <thead>
            <tr className="border-b border-surface-border/40">
              <th className="pb-3 pr-4 text-left text-[10px] font-medium uppercase tracking-wider text-text-faint">
                Factor
              </th>
              <th className="px-4 pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-accent">
                Adaptive
              </th>
              <th className="px-4 pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-text-faint">
                KnowBe4
              </th>
              <th className="px-4 pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-text-faint">
                Cofense
              </th>
              <th className="px-4 pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-text-faint">
                Proofpoint
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <motion.tr
                key={row.factor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-surface-border/20 last:border-b-0"
              >
                <td className="py-3 pr-4 font-medium text-text-primary">
                  {row.factor}
                </td>
                <td className="px-4 py-3">
                  <StrengthBadge s={row.adaptive} />
                </td>
                <td className="px-4 py-3">
                  <StrengthBadge s={row.knowbe4} />
                </td>
                <td className="px-4 py-3">
                  <StrengthBadge s={row.cofense} />
                </td>
                <td className="px-4 py-3">
                  <StrengthBadge s={row.proofpoint ?? "unknown"} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
        <div>
          <p className="text-[12px] font-medium text-text-primary">
            Deal positioning intelligence
          </p>
          <p className="mt-1 text-[11px] text-text-muted">
            I use this framing to help security leaders compare on what matters: deepfake defense, real engagement, and security culture — not just phishing click rates.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
