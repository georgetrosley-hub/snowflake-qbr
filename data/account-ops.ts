import type {
  Account,
  AccountSignal,
  AccountUpdate,
  Competitor,
  ExecutionItem,
  Stakeholder,
  WorkspaceDraft,
} from "@/types";

import { priorityAccounts } from "@/data/territory-data";

const priorityById = Object.fromEntries(priorityAccounts.map((p) => [p.id, p])) as Record<
  string,
  (typeof priorityAccounts)[number]
>;

function parseSponsor(rawSponsor: string) {
  const match = rawSponsor.match(/^(.*?)\s+\((.*?)\)$/);
  if (!match) {
    return { name: rawSponsor, title: "Executive sponsor" };
  }
  return { name: match[1], title: match[2] };
}

export function buildAccountSignals(
  account: Account,
  competitors: Competitor[]
): AccountSignal[] {
  const competitorsTop = competitors
    .slice()
    .sort((a, b) => b.accountRiskLevel - a.accountRiskLevel)
    .slice(0, 3);

  const pa = priorityById[account.id];

  if (!pa) {
    return [
      {
        id: `${account.id}-sig-0`,
        title: "Baseline expansion opportunity identified",
        summary: "Wedge and next action exist; validate ownership, budget, and timeline before committing POV scope.",
        priority: "medium",
        confidence: 0.62,
        owner: "AE",
        impact: "Reduces POV risk and speeds time-to-credibility.",
        recommendedAction: "Confirm owner + evaluation criteria for the first-pilot workflow.",
        sourceType: "relationship",
        sourceLabel: "Territory profile",
        sourceFreshness: "2025-03-20",
        disposition: "watch",
      },
    ];
  }

  const base: Array<Omit<AccountSignal, "id">> = [
    {
      title: "Expansion wedge is active and sponsor-aligned",
      summary: pa.nextAction,
      priority: "high",
      confidence: 0.72,
      owner: "AE",
      impact: "Creates a near-term motion to prove value, then expand consumption across teams.",
      recommendedAction: "Lock discovery inputs and build a 30-day POV evidence plan with named owners.",
      sourceType: "crm",
      sourceLabel: "Territory OS profile",
      sourceFreshness: "2025-03-20",
      disposition: "validated",
    },
    {
      title: "Governance and ownership gaps will slow adoption if unaddressed",
      summary: `Top blockers: ${account.topBlockers.slice(0, 2).join("; ")}`,
      priority: "medium",
      confidence: 0.66,
      owner: "SE / AE",
      impact: "Prevents security/procurement stalls and keeps the pilot on schedule.",
      recommendedAction: "Map the approval chain (governance owner, security path, procurement) and schedule one alignment meeting this week.",
      sourceType: "document",
      sourceLabel: "Account profile",
      sourceFreshness: "2025-03-19",
      disposition: "watch",
    },
    {
      title: "Competitive pressure concentrated in incumbent alternatives",
      summary: `Key alternatives in play: ${competitorsTop.map((c) => c.name).join(", ")}.`,
      priority: competitorsTop[0]?.accountRiskLevel && competitorsTop[0].accountRiskLevel >= 75 ? "critical" : "high",
      confidence: 0.6,
      owner: "AE",
      impact: "Without a differentiated business-led wedge, deals drift into tooling-only conversations.",
      recommendedAction: "Pressure-test win theme with a battle card tailored to the highest-risk alternative.",
      sourceType: "market",
      sourceLabel: "Competitive landscape seed",
      sourceFreshness: "2025-03-15",
      disposition: "challenged",
    },
  ];

  // Add one account-specific signal.
  const accountSpecific: Record<string, Omit<AccountSignal, "id">[]> = {
    "us-financial-technology": [
      {
        title: "Regulatory workflow needs defensible lineage and audit trail",
        summary: "Reporting latency and fragmented lineage slow response; governance is non-negotiable for production expansion.",
        priority: "critical",
        confidence: 0.74,
        owner: "AE / Security",
        impact: "Enables leadership confidence and reduces security review rework.",
        recommendedAction: "Propose a Horizon-governed reporting POV with scoped RAPs and lineage demo.",
        sourceType: "relationship",
        sourceLabel: "Regulatory sponsor mapping",
        sourceFreshness: "2025-03-18",
        disposition: "validated",
      },
    ],
    "sagent-lending": [
      {
        title: "Ops reconciliation and deployment health is opaque during Dara scale-out",
        summary: "Cycle time and deployment reliability are unclear; CS and Product need a measurable exception path.",
        priority: "high",
        confidence: 0.7,
        owner: "AE / Product",
        impact: "Turns pilot success into an expansion backlog with quantified outcomes.",
        recommendedAction: "Select 1–2 at-risk deployments, define success metrics, and land an ops mart as system of record.",
        sourceType: "crm",
        sourceLabel: "Pilot scope baseline",
        sourceFreshness: "2025-03-17",
        disposition: "watch",
      },
    ],
    "ciena-corp": [
      {
        title: "CFO forecast accuracy pressure will force faster margin visibility",
        summary: "Backlog risk visible in time to act; leadership wants a no-spreadsheet readout.",
        priority: "high",
        confidence: 0.67,
        owner: "AE / Finance ops",
        impact: "Creates a leadership-visible expansion motion tied to outcomes.",
        recommendedAction: "Deliver a Snowflake-based margin bridge for 2–3 AI deals and align on the next portfolio tranche.",
        sourceType: "market",
        sourceLabel: "Earnings + ops signal seed",
        sourceFreshness: "2025-03-16",
        disposition: "watch",
      },
    ],
  };

  const extras = accountSpecific[account.id] ?? [];
  return [...base, ...extras].map((s, i) => ({ ...s, id: `${account.id}-sig-${i}` }));
}

export function buildStakeholders(account: Account): Stakeholder[] {
  return account.executiveSponsors.map((raw, i) => {
    const { name, title } = parseSponsor(raw);
    // Seed a realistic political map: champion first, economic buyer second, ally third.
    const stance =
      i === 0 ? ("champion" as const) : i === 1 ? ("executive" as const) : i === 2 ? ("ally" as const) : ("neutral" as const);
    const relationshipStrength =
      stance === "champion"
        ? 0.86
        : stance === "ally"
          ? 0.66
          : stance === "executive"
            ? 0.6
            : 0.35;
    return {
      id: `${account.id}-exec-${i}`,
      name,
      title,
      team: "Executive",
      stance,
      influence: stance === "champion" ? "high" : stance === "ally" || stance === "executive" ? "medium" : "low",
      relationshipStrength,
      nextStep:
        i === 0
          ? "Align POV evidence plan + approval chain"
          : i === 1
            ? "Confirm evaluation criteria + budget timing"
            : i === 2
              ? "Validate pilot success metrics + governance path"
              : "Validate remaining requirements during security review",
      note: "Seeded from account executive sponsor profile.",
      lastTouch: "2025-03-20",
      proofNeeded:
        i === 0
          ? "Executive-visible proof + expansion scope"
          : i === 1
            ? "Timeline, decision chain, and value quantification"
            : "Pilot success metrics and governance path",
      recentMoment:
        i === 0
          ? "Escalated evaluation criteria for governed workflows"
          : i === 1
            ? "Focused the evaluation on decision speed and trust"
            : "Synchronized pilot success criteria with governance requirements",
      risk: stance === "neutral" ? "Needs validation on value and owners" : "",
    };
  });
}

export function buildExecutionItems(_account: Account): ExecutionItem[] {
  const account = _account;
  const pa = priorityById[account.id];

  const base: ExecutionItem[] = [
    {
      id: `${account.id}-exec-0`,
      title: "Confirm first-pilot scope + decision chain",
      phase: "Discovery",
      owner: "AE",
      status: "in_progress",
      dueLabel: "Due Wed (next 72h)",
      detail:
        "Lock 30-day evidence plan: which workflow, what success metrics, and who signs off on governance/security and pilot criteria.",
      decisionRequired: true,
      decisionStatus: "pending",
      checkpoint: "Named owner + evaluation criteria approved in one thread",
      lastUpdated: "Just now",
    },
    {
      id: `${account.id}-exec-1`,
      title: "Land minimum governance story (lineage + access policy) for scoped data",
      phase: "POV",
      owner: "SE",
      status: "ready",
      dueLabel: "Due Fri (this week)",
      detail:
        "Prepare a Horizon-governed demo narrative with RAPs/lineage and an audit-ready explanation for security reviewers.",
      checkpoint: "Governed workflow demo + security packet outline",
      lastUpdated: "Yesterday",
    },
    {
      id: `${account.id}-exec-2`,
      title: "Pressure-test win theme vs highest-risk alternative",
      phase: "POV",
      owner: "AE",
      status: "ready",
      dueLabel: "Due Fri (this week)",
      detail:
        "Run a battle card review and explicitly identify where the competitor will win—then tighten displacement points into the POV story.",
      checkpoint: "Battle card + trap questions for exec conversation",
      lastUpdated: "Yesterday",
    },
    {
      id: `${account.id}-exec-3`,
      title: "Define expansion unlock: next workload + sequencing",
      phase: "Expansion",
      owner: "AE",
      status: "in_progress",
      dueLabel: "Due next Mon",
      detail:
        "Convert POV evidence into an expansion backlog with at least two adjacent teams/workloads and clear owners/dates.",
      checkpoint: "Expansion backlog draft ready for exec readout",
      lastUpdated: "Just now",
    },
  ];

  // Add a single account-specific execution item.
  const specific: Record<string, ExecutionItem[]> = {
    "us-financial-technology": [
      {
        id: `${account.id}-exec-4`,
        title: "Regulatory anomaly POV readout + audit trail walkthrough",
        phase: "POV",
        owner: "Security / AE",
        status: "ready",
        dueLabel: "Due next Tue",
        detail:
          "Deliver a structured readout: latency delta, lineage proof, access control story, and executive expansion ask.",
        checkpoint: "Executive approves expansion scope (team + next workload)",
        lastUpdated: "Today",
      },
    ],
    "sagent-lending": [
      {
        id: `${account.id}-exec-4`,
        title: "Ops reconciliation and exception dashboard for pilot cohort",
        phase: "Pilot",
        owner: "CS / AE",
        status: "in_progress",
        dueLabel: "Due Thu",
        detail:
          "Create and validate an exception path dashboard tied to deployment health telemetry and reconciliation outcomes.",
        checkpoint: "CS sign-off on system-of-record for pilot cohort",
        lastUpdated: "Today",
      },
    ],
    "ciena-corp": [
      {
        id: `${account.id}-exec-4`,
        title: "CFO margin bridge for 2–3 AI deals (no manual spreadsheets)",
        phase: "Pilot",
        owner: "FP&A Ops",
        status: "ready",
        dueLabel: "Due Thu",
        detail:
          "Produce a scoped margin bridge and backlog-risk view inside Snowflake; align on SLA for refresh cadence.",
        checkpoint: "CFO trusts the metrics and approves next portfolio tranche",
        lastUpdated: "Today",
      },
    ],
  };

  return [...base, ...(specific[account.id] ?? [])].map((i) => ({
    ...i,
    // Use a baseline recommended owner if missing.
    owner: i.owner || pa?.nextAction || "AE",
  }));
}

export function buildWorkspaceDraft(
  account: Account,
  competitors: Competitor[]
): WorkspaceDraft {
  const pa = priorityById[account.id];
  const topCompetitor = competitors
    .slice()
    .sort((a, b) => b.accountRiskLevel - a.accountRiskLevel)[0];

  return {
    dealThesis:
      pa?.povHypothesis ??
      "Expansion depends on connecting governance, ownership, and measurable outcomes across siloed teams.",
    winTheme:
      topCompetitor
        ? `Win by owning the governed evidence story against ${topCompetitor.name}: audit-ready lineage + faster time-to-decision.`
        : "Win by delivering an audit-ready governed evidence story that proves time-to-value.",
    thisWeekFocus: pa?.nextAction ?? account.firstWedge,
    operatorNotes:
      "Operator notes: confirm decision chain, align on one executive-visible success metric, and build the security/procurement narrative before pilot expansion discussions.",
    opportunityName: `${account.name} · Expansion`,
    acvUsd: String(Math.round(account.estimatedLandValue * 1_000_000)),
    termMonths: "12",
    forecastCategory: "Pipeline",
  };
}

export function buildAccountUpdates(_account: Account): AccountUpdate[] {
  const account = _account;
  const pa = priorityById[account.id];

  const nowish = (offsetDays: number) => {
    if (offsetDays === 0) return "Just now";
    if (offsetDays === 1) return "Yesterday";
    if (offsetDays === 2) return "Two days ago";
    return "2025-03-18";
  };

  const seeded: Record<string, AccountUpdate[]> = {
    "us-financial-technology": [
      {
        id: `${account.id}-upd-0`,
        createdAt: nowish(0),
        author: "AE",
        title: "Regulatory POV scope aligned on one anomaly workflow",
        note: "Confirmed the first regulated workflow is feasible in-scope. Next: schedule governance owner + security narrative review before the pilot readout.",
        tag: "next_step",
      },
      {
        id: `${account.id}-upd-1`,
        createdAt: nowish(1),
        author: "SE",
        title: "Lineage + access policy story drafted for security questionnaire",
        note: "Prepared an audit-ready lineage walkthrough and mapped where RAPs will be applied. Need confirmation on who owns approval in IAM.",
        tag: "risk",
      },
      {
        id: `${account.id}-upd-2`,
        createdAt: nowish(2),
        author: "AE",
        title: "Competitor drift risk identified (tooling-only evaluation)",
        note: "Databricks pushback will come up when we focus on latency + lineage proof. Prepare trap questions for the executive conversation.",
        tag: "exec",
      },
    ],
    "sagent-lending": [
      {
        id: `${account.id}-upd-0`,
        createdAt: nowish(0),
        author: "AE",
        title: "CS + Product aligned on exception path pilot success metric",
        note: "Defined success as cycle-time improvement on one reconciliation workflow. Next: pull telemetry + billing signals for pilot cohort within 48h.",
        tag: "call",
      },
      {
        id: `${account.id}-upd-1`,
        createdAt: nowish(1),
        author: "AE",
        title: "Governance approval chain still unclear (owner gap)",
        note: "Security path is likely RAPs + network constraints. Need named decision owner for production pilot approval.",
        tag: "risk",
      },
      {
        id: `${account.id}-upd-2`,
        createdAt: nowish(2),
        author: "SE",
        title: "Ops mart blueprint ready for pilot cohort",
        note: "Proposed Snowflake-centric ops mart + task pipeline for deployment health and reconciliation exceptions.",
        tag: "internal",
      },
    ],
    "ciena-corp": [
      {
        id: `${account.id}-upd-0`,
        createdAt: nowish(0),
        author: "AE",
        title: "CFO interested in no-spreadsheet margin bridge for AI deals",
        note: "Backlog risk needs visibility in the SLA window for action. Next: confirm refresh cadence + data contract for 2–3 deals.",
        tag: "exec",
      },
      {
        id: `${account.id}-upd-1`,
        createdAt: nowish(1),
        author: "FP&A Ops",
        title: "Reporting latency pain explicitly tied to forecast accuracy",
        note: "They can’t tolerate batch-only reporting. Need a side-by-side latency story with governance.",
        tag: "risk",
      },
      {
        id: `${account.id}-upd-2`,
        createdAt: nowish(2),
        author: "AE",
        title: "Expansion unlock mapped (next portfolio tranche)",
        note: pa?.expansionPathSteps ? `Drafted expansion sequencing: ${pa.expansionPathSteps.slice(0, 3).join(" → ")}.` : "Drafted expansion sequencing for CFO approval.",
        tag: "next_step",
      },
    ],
  };

  return seeded[account.id] ?? [];
}

export function getCurrentPhaseLabel(items: ExecutionItem[]) {
  const activeItem =
    items.find((item) => item.status === "blocked") ??
    items.find((item) => item.status === "in_progress") ??
    items.find((item) => item.status === "ready") ??
    items[0];

  return activeItem?.phase ?? "Land";
}
