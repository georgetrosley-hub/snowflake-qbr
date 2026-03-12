"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { OrgNodeCard } from "@/components/ui/org-node-card";
import { StreamingContent } from "@/components/ui/streaming-content";
import { useStreaming } from "@/lib/hooks/use-streaming";
import { ClaudeSparkle } from "@/components/ui/claude-logo";
import type { OrgNode, Account, Competitor } from "@/types";

interface OrgExpansionMapProps {
  nodes: OrgNode[];
  account: Account;
  competitors: Competitor[];
}

interface NodePosition {
  x: number;
  y: number;
}

const departmentOrder = [
  "Engineering",
  "Platform Engineering",
  "Security",
  "IT",
  "Finance",
  "Legal",
  "Operations",
  "Customer Support",
  "Product",
  "Data / AI",
  "Executive Leadership",
] as const;

const defaultUseCases: Record<(typeof departmentOrder)[number], string> = {
  Engineering: "Code generation and review",
  "Platform Engineering": "Internal tooling and docs",
  Security: "Policy and compliance review",
  IT: "Help desk and provisioning",
  Finance: "Excel and reporting automation",
  Legal: "Contract and document review",
  Operations: "Process documentation",
  "Customer Support": "Ticket handling and knowledge",
  Product: "PRD and spec generation",
  "Data / AI": "Model and data workflows",
  "Executive Leadership": "Strategic synthesis and reporting",
};

const nodePositions: Record<(typeof departmentOrder)[number], NodePosition> = {
  Engineering: { x: 15, y: 16 },
  "Platform Engineering": { x: 39, y: 9 },
  Security: { x: 72, y: 16 },
  IT: { x: 13, y: 42 },
  Finance: { x: 31, y: 61 },
  Legal: { x: 50, y: 74 },
  Operations: { x: 69, y: 61 },
  "Customer Support": { x: 87, y: 42 },
  Product: { x: 25, y: 88 },
  "Data / AI": { x: 75, y: 88 },
  "Executive Leadership": { x: 50, y: 40 },
};

const connections: Array<[(typeof departmentOrder)[number], (typeof departmentOrder)[number]]> = [
  ["Engineering", "Platform Engineering"],
  ["Platform Engineering", "Security"],
  ["Security", "IT"],
  ["IT", "Operations"],
  ["Operations", "Customer Support"],
  ["Customer Support", "Product"],
  ["Product", "Data / AI"],
  ["Data / AI", "Engineering"],
  ["Finance", "Legal"],
  ["Legal", "Operations"],
  ["Platform Engineering", "Executive Leadership"],
  ["Finance", "Executive Leadership"],
  ["Product", "Executive Leadership"],
  ["Data / AI", "Executive Leadership"],
  ["Customer Support", "Executive Leadership"],
  ["Security", "Executive Leadership"],
];

export function OrgExpansionMap({ nodes, account, competitors }: OrgExpansionMapProps) {
  const normalizedNodes: OrgNode[] = departmentOrder.map((name) => {
    const existing = nodes.find((node) => node.name === name);
    if (existing) return existing;
    return {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      useCase: defaultUseCases[name],
      buyingLikelihood: 50,
      arrPotential: 0,
      status: "latent",
      recommendedNextStep: "Map stakeholders",
    };
  });

  const activeCount = normalizedNodes.filter(
    (n) => n.status === "pilot" || n.status === "deployed" || n.status === "engaged"
  ).length;

  const totalPotential = normalizedNodes.reduce((sum, node) => sum + node.arrPotential, 0);
  const activeNodes = normalizedNodes.filter(
    (n) => n.status === "engaged" || n.status === "pilot" || n.status === "deployed"
  );

  const expansionPitch = useStreaming();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const generateExpansionPitch = useCallback(
    (deptName: string) => {
      setSelectedDept(deptName);
      const node = normalizedNodes.find((n) => n.name === deptName);
      expansionPitch.startStream({
        url: "/api/generate",
        body: {
          type: "expansion_pitch",
          account,
          competitors,
          context: `Department: ${deptName}\nUse case: ${node?.useCase ?? "General"}\nCurrent status: ${node?.status ?? "latent"}\nBuying likelihood: ${node?.buyingLikelihood ?? 50}%\nARR potential: $${(node?.arrPotential ?? 0).toFixed(2)}M`,
        },
      });
    },
    [normalizedNodes, account, competitors, expansionPitch]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-10"
    >
      <div className="flex items-end justify-between gap-6">
        <SectionHeader
          title="Org expansion map"
          subtitle={`${activeCount} departments active · $${totalPotential.toFixed(2)}M ARR potential`}
        />
        {activeNodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-[46ch] text-right text-[12px] text-claude-coral/60"
          >
            {activeNodes.map((n) => n.name).join(" · ")}
          </motion.div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-claude-coral/10 bg-gradient-to-br from-surface-elevated/85 via-surface/75 to-surface-elevated/85 px-8 py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(218,119,86,0.08),transparent_45%),radial-gradient(circle_at_18%_18%,rgba(218,119,86,0.04),transparent_35%),radial-gradient(circle_at_86%_84%,rgba(218,119,86,0.03),transparent_30%)]" />

        <div className="relative h-[920px] w-full">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="org-link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(218,119,86,0.1)" />
                <stop offset="50%" stopColor="rgba(218,119,86,0.35)" />
                <stop offset="100%" stopColor="rgba(218,119,86,0.1)" />
              </linearGradient>
            </defs>

            {connections.map(([from, to], idx) => {
              const start = nodePositions[from];
              const end = nodePositions[to];
              const isActivated =
                activeNodes.some((n) => n.name === from) || activeNodes.some((n) => n.name === to);
              const controlY = Math.min(start.y, end.y) + Math.abs(start.y - end.y) * 0.35 - 8;

              return (
                <motion.path
                  key={`${from}-${to}`}
                  d={`M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${controlY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="url(#org-link-gradient)"
                  strokeWidth={isActivated ? 0.48 : 0.25}
                  strokeOpacity={isActivated ? 1 : 0.52}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isActivated ? [0.55, 1, 0.55] : [0.2, 0.45, 0.2],
                  }}
                  transition={{
                    pathLength: { duration: 1.15, delay: idx * 0.05, ease: "easeOut" },
                    opacity: {
                      duration: isActivated ? 2.2 : 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
              );
            })}
          </svg>

          {normalizedNodes.map((node, i) => {
            const position = nodePositions[node.name as (typeof departmentOrder)[number]];
            return (
              <motion.div
                key={node.id}
                className="group absolute w-[288px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
              >
                <div className="relative">
                  <OrgNodeCard node={node} index={i} />
                  <button
                    onClick={() => generateExpansionPitch(node.name)}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1.5 bg-claude-coral/10 border border-claude-coral/20 text-claude-coral/70 hover:bg-claude-coral/20"
                    title={`Expansion pitch for ${node.name}`}
                  >
                    <ClaudeSparkle size={10} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expansion pitch */}
      {(expansionPitch.content || expansionPitch.isStreaming) && (
        <StreamingContent
          content={expansionPitch.content}
          isStreaming={expansionPitch.isStreaming}
          onRegenerate={() => selectedDept && generateExpansionPitch(selectedDept)}
          label={`Expansion: ${selectedDept}`}
        />
      )}
    </motion.div>
  );
}
