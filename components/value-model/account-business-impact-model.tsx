"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  DirectionalDisclaimer,
  InsightBox,
  OutputMetricRow,
  SliderField,
  SnowflakeAttributionBlock,
  ValueModelCard,
} from "@/components/value-model/value-model-primitives";
import { AdvancedAssumptionsPanel } from "@/components/value-model/advanced-assumptions-panel";
import { PrimaryValueSlider } from "@/components/value-model/primary-value-slider";
import { ImpactExplanationModal, type ImpactExplanationSection } from "@/components/value-model/impact-explanation-modal";
import {
  clamp,
  formatCount,
  formatCurrencyCompact,
  formatCurrencyInput,
  formatPercent,
} from "@/lib/value-model-format";
import {
  computeCienaSnowflakeEnabled,
  computeFintechSnowflakeEnabled,
  computeSagentSnowflakeEnabled,
} from "@/lib/snowflake-enabled-value";
import { SnowflakeEnabledValueBlock } from "@/components/value-model/snowflake-enabled-value-block";
import { cn } from "@/lib/utils";

type AccountBusinessImpactModelProps = {
  accountId: string;
  accountName: string;
  proofPoint: string;
};

export function AccountBusinessImpactModel({ accountId, accountName, proofPoint }: AccountBusinessImpactModelProps) {
  if (accountId === "ciena-corp") {
    return <CienaImpactModel accountName={accountName} proofPoint={proofPoint} />;
  }
  if (accountId === "sagent-lending") {
    return <SagentImpactModel accountName={accountName} proofPoint={proofPoint} />;
  }
  if (accountId === "us-financial-technology") {
    return <UsFintechImpactModel accountName={accountName} proofPoint={proofPoint} />;
  }
  return null;
}

function ExplainButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-lg border border-accent/28 bg-accent/[0.08] px-3 py-2.5",
        "text-[11px] font-semibold text-accent transition-colors hover:bg-accent/[0.12]"
      )}
    >
      Explain the Impact
    </button>
  );
}

function ModelIntro({ children }: { children: ReactNode }) {
  return <p className="text-[12px] font-medium leading-snug text-text-secondary">{children}</p>;
}

/* ——— Ciena ——— */

function CienaImpactModel({ accountName, proofPoint }: { accountName: string; proofPoint: string }) {
  const [backlog, setBacklog] = useState(45_000_000);
  const [riskPct, setRiskPct] = useState(18);
  const [grossMarginPct, setGrossMarginPct] = useState(42);
  /** Default ~65% along the visibility lever — strong, credible first view. */
  const [improvementPct, setImprovementPct] = useState(38);
  const [explainOpen, setExplainOpen] = useState(false);

  const revenueAtRisk = backlog * (riskPct / 100);
  const marginExposure = revenueAtRisk * (grossMarginPct / 100);
  const recoverableMargin = marginExposure * (improvementPct / 100);

  const snowflakeEnabled = useMemo(
    () => computeCienaSnowflakeEnabled(recoverableMargin, improvementPct, grossMarginPct, riskPct),
    [recoverableMargin, improvementPct, grossMarginPct, riskPct]
  );

  const interpretation = useMemo(() => {
    if (improvementPct < 14) {
      return "At limited visibility, only a thin slice of margin exposure is realistically defendable before the forecast locks.";
    }
    if (improvementPct < 28) {
      return "More cross-functional visibility increases the share of margin exposure leadership can act on while trade-offs still exist.";
    }
    if (improvementPct < 42) {
      return "Stronger execution visibility materially raises the portion of margin exposure that is protectable — not just visible.";
    }
    return "At this level of visibility improvement, backlog-to-margin risk becomes materially more defendable before variance hits the forecast.";
  }, [improvementPct]);

  const execInsight = useMemo(() => {
    const rev = formatCurrencyCompact(revenueAtRisk);
    const me = formatCurrencyCompact(marginExposure);
    const snow = formatCurrencyCompact(snowflakeEnabled.value);
    if (revenueAtRisk >= 8_000_000) {
      return `Snowflake-enabled recoverable margin is directionally ${snow} against ${me} in total margin exposure (${rev} revenue at risk). The POV proves governed visibility lands early enough to defend dollars, not just ship dashboards.`;
    }
    if (revenueAtRisk >= 2_000_000) {
      return `Snowflake-enabled recoverable margin is directionally ${snow}; ${me} in margin exposure on ${rev} at risk means modest visibility gains still defend material dollars if they land before the quarter locks.`;
    }
    return `Snowflake-enabled recoverable margin is directionally ${snow} on ${me} margin exposure and ${rev} revenue at risk — the open question is whether ops and finance see it in time to act.`;
  }, [marginExposure, revenueAtRisk, snowflakeEnabled.value]);

  const sections: ImpactExplanationSection[] = useMemo(
    () => [
      {
        title: "Snowflake-enabled value",
        body: `The Snowflake-enabled recoverable margin is ${formatCurrencyCompact(snowflakeEnabled.value)} — ${formatPercent(snowflakeEnabled.unlockRatio * 100, 0)} of the ${formatCurrencyCompact(recoverableMargin)} recoverable margin at ${formatPercent(improvementPct)} visibility improvement. That is the near-term, finance-credible pool Snowflake makes attainable on data already in motion.`,
      },
      {
        title: "Total exposure",
        body: `Margin exposure is ${formatCurrencyCompact(marginExposure)} on ${formatCurrencyCompact(revenueAtRisk)} revenue at risk (${formatCurrencyCompact(backlog)} AI backlog, ${formatPercent(riskPct)} at risk, ${formatPercent(grossMarginPct)} gross margin). Recoverable margin before Snowflake attribution is ${formatCurrencyCompact(recoverableMargin)}. Proof: ${proofPoint}.`,
      },
      {
        title: "Why Snowflake makes this achievable",
        body: `At this level of backlog risk, improving visibility even modestly protects meaningful margin. Snowflake matters because it delivers that insight quickly on ERP and CRM data that already exists — without a multi-quarter rebuild — so leadership can act before the forecast locks.`,
      },
      {
        title: "Why this is a strong first workload",
        body: `Narrow wedge: order → backlog → fulfillment → margin on a bounded set of deals. Prove governed signal in weeks, then expand coverage with readouts executives trust.`,
      },
    ],
    [
      backlog,
      grossMarginPct,
      improvementPct,
      marginExposure,
      proofPoint,
      recoverableMargin,
      revenueAtRisk,
      riskPct,
      snowflakeEnabled.unlockRatio,
      snowflakeEnabled.value,
    ]
  );

  return (
    <>
      <ValueModelCard
        variant="standalone"
        action={<ExplainButton onClick={() => setExplainOpen(true)} />}
        footer={<DirectionalDisclaimer />}
      >
        <div className="space-y-4">
          <ModelIntro>
            One lever: how much margin exposure becomes protectable as backlog and fulfillment visibility improves on
            governed operational data.
          </ModelIntro>

          <SnowflakeEnabledValueBlock
            variant="hero"
            title="Snowflake-enabled recoverable margin"
            heroEyebrow="Near-term impact"
            heroSubline="Even a small increase in visibility can protect millions in margin at this scale."
            valueDisplay={formatCurrencyCompact(snowflakeEnabled.value)}
            portionLine={
              recoverableMargin > 0
                ? `≈ ${formatPercent(snowflakeEnabled.unlockRatio * 100, 0)} of recoverable margin in an initial motion`
                : "Raise visibility improvement to see directional unlock — no recoverable margin at these inputs."
            }
            barPercent={recoverableMargin > 0 ? snowflakeEnabled.unlockRatio * 100 : 0}
            supportingText="Derived from the visibility lever and baseline exposure — not a manual adoption guess. Snowflake makes this number real because governed signal lands on data already in motion."
            timeToValueBadge="Days, not months"
            timeToValueHint="Initial cross-functional signal on existing data without a multi-quarter replatform gate."
          />

          <PrimaryValueSlider
            id="ciena-visibility"
            label="Improvement in backlog visibility with Snowflake"
            hint="Move right for stronger cross-system visibility — more margin becomes realistically defendable."
            min={5}
            max={55}
            step={1}
            value={improvementPct}
            onChange={(n) => setImprovementPct(clamp(Math.round(n), 5, 55))}
            suffix="%"
            formatDisplay={(n) => String(n)}
            interpretation={interpretation}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <OutputMetricRow label="Total margin exposure" value={formatCurrencyCompact(marginExposure)} />
            <OutputMetricRow label="Recoverable margin" value={formatCurrencyCompact(recoverableMargin)} />
            <OutputMetricRow label="Revenue at risk" value={formatCurrencyCompact(revenueAtRisk)} />
          </div>

          <SnowflakeAttributionBlock
            lines={[
              "Works on ERP and CRM data already in place — avoids a long pipeline rebuild before anything is visible.",
              "Aligns sales, ops, and finance on one governed view of demand vs. fulfillment and margin exposure.",
              "Fast enough to matter in-quarter: insight before the forecast locks, when trade-offs still exist.",
            ]}
          />

          <InsightBox>{execInsight}</InsightBox>

          <AdvancedAssumptionsPanel>
            <SliderField
              id="ciena-backlog"
              label="Total AI backlog"
              hint="Directional backlog tied to AI demand you are executing against."
              min={5_000_000}
              max={120_000_000}
              step={500_000}
              value={backlog}
              onChange={(n) => setBacklog(clamp(n, 5_000_000, 120_000_000))}
              suffix="$"
              formatDisplay={(n) => `$${formatCurrencyInput(n)}`}
            />
            <SliderField
              id="ciena-risk"
              label="Share of backlog at risk"
              orientationHint="Held constant for the primary visibility story unless discovery says otherwise."
              min={5}
              max={45}
              step={1}
              value={riskPct}
              onChange={(n) => setRiskPct(clamp(n, 5, 45))}
              suffix="%"
              formatDisplay={(n) => String(n)}
            />
            <SliderField
              id="ciena-gm"
              label="Gross margin"
              orientationHint="Scales margin exposure from the same revenue at risk."
              min={18}
              max={62}
              step={1}
              value={grossMarginPct}
              onChange={(n) => setGrossMarginPct(clamp(n, 18, 62))}
              suffix="%"
              formatDisplay={(n) => String(n)}
            />
          </AdvancedAssumptionsPanel>
        </div>
      </ValueModelCard>

      <ImpactExplanationModal
        open={explainOpen}
        onClose={() => setExplainOpen(false)}
        accountLabel={accountName}
        sections={sections}
      />
    </>
  );
}

/* ——— Sagent ——— */

function sagentDetectDaysFromLever(earlyDetectionPct: number): number {
  const t = (clamp(earlyDetectionPct, 10, 85) - 10) / 75;
  return Math.round(52 - t * 44);
}

function SagentImpactModel({ accountName, proofPoint }: { accountName: string; proofPoint: string }) {
  const [deployments, setDeployments] = useState(48);
  const [underPct, setUnderPct] = useState(12);
  const [arr, setArr] = useState(420_000);
  /** Default ~65% along the detection lever — strong first view without exaggeration. */
  const [earlyDetectionPct, setEarlyDetectionPct] = useState(62);
  const [explainOpen, setExplainOpen] = useState(false);

  const atRiskDeployments = Math.round(deployments * (underPct / 100));
  const arrAtRisk = atRiskDeployments * arr;
  const recoverableArr = arrAtRisk * (earlyDetectionPct / 100);
  const detectDays = sagentDetectDaysFromLever(earlyDetectionPct);

  const snowflakeEnabled = useMemo(
    () => computeSagentSnowflakeEnabled(recoverableArr, earlyDetectionPct, detectDays, underPct),
    [recoverableArr, earlyDetectionPct, detectDays, underPct]
  );

  const interpretation = useMemo(() => {
    if (earlyDetectionPct < 22) {
      return "Limited early detection means most at-risk ARR is still exposed before Customer Success can intervene.";
    }
    if (earlyDetectionPct < 45) {
      return "Earlier issue detection increases the share of at-risk ARR that becomes realistically recoverable before retention damage compounds.";
    }
    if (earlyDetectionPct < 68) {
      return "Stronger cross-customer visibility raises protectable ARR — the motion shifts from reactive saves to prevention.";
    }
    return "At high early-detection coverage, a large share of exposed ARR is protectable in a realistic first motion — the economics look like retention leadership, not telemetry.";
  }, [earlyDetectionPct]);

  const execInsight = useMemo(() => {
    const adr = formatCurrencyCompact(arrAtRisk);
    const rec = formatCurrencyCompact(recoverableArr);
    const snow = formatCurrencyCompact(snowflakeEnabled.value);
    if (atRiskDeployments <= 1) {
      return `ARR protected with Snowflake is directionally ${snow} (${rec} recoverable on ${adr} at risk). At ~${detectDays} days to surface issues, earlier detection is the difference between a save and a churn narrative.`;
    }
    return `ARR protected with Snowflake is directionally ${snow} — ${rec} recoverable ARR on ${adr} at risk across ${formatCount(atRiskDeployments)} deployments. Proof: ${proofPoint}.`;
  }, [arrAtRisk, atRiskDeployments, detectDays, proofPoint, recoverableArr, snowflakeEnabled.value]);

  const sections: ImpactExplanationSection[] = useMemo(
    () => [
      {
        title: "Snowflake-enabled value",
        body: `ARR protected with Snowflake is ${formatCurrencyCompact(snowflakeEnabled.value)} — ${formatPercent(snowflakeEnabled.unlockRatio * 100, 0)} of ${formatCurrencyCompact(recoverableArr)} recoverable ARR at ${formatPercent(earlyDetectionPct, 0)} early-detection coverage (~${detectDays} days to surface). That is the retention-weighted outcome leadership can underwrite in the first motion.`,
      },
      {
        title: "Total exposure",
        body: `ARR at risk is ${formatCurrencyCompact(arrAtRisk)} across ${formatCount(atRiskDeployments)} at-risk deployments (${formatCount(deployments)} Dara deployments, ${formatPercent(underPct)} underperforming, ${formatCurrencyCompact(arr)} average ARR). Recoverable ARR before Snowflake attribution is ${formatCurrencyCompact(recoverableArr)}. ${proofPoint}`,
      },
      {
        title: "Why Snowflake makes this achievable",
        body: `Earlier detection across even a narrow cohort changes who intervenes before retention damage compounds. Snowflake makes deployment health legible across customers without bespoke engineering — so “earlier” is operational, not a slide.`,
      },
      {
        title: "Why this is a strong first workload",
        body: `One ops-owned exception path, a pilot cohort, measurable cycle-time improvement — economics the exec sponsor can repeat and fund.`,
      },
    ],
    [
      arr,
      arrAtRisk,
      atRiskDeployments,
      deployments,
      detectDays,
      earlyDetectionPct,
      proofPoint,
      recoverableArr,
      snowflakeEnabled.unlockRatio,
      snowflakeEnabled.value,
      underPct,
    ]
  );

  return (
    <>
      <ValueModelCard
        variant="standalone"
        action={<ExplainButton onClick={() => setExplainOpen(true)} />}
        footer={<DirectionalDisclaimer />}
      >
        <div className="space-y-4">
          <ModelIntro>
            One lever: how much at-risk ARR becomes protectable when deployment issues surface earlier across customers —
            without slowing rollouts.
          </ModelIntro>

          <SnowflakeEnabledValueBlock
            variant="hero"
            title="ARR protected with Snowflake"
            heroEyebrow="Value Snowflake can unlock quickly"
            heroSubline="Earlier detection across even a small set of deployments can materially impact retention."
            valueDisplay={formatCurrencyCompact(snowflakeEnabled.value)}
            portionLine={
              recoverableArr > 0
                ? `≈ ${formatPercent(snowflakeEnabled.unlockRatio * 100, 0)} of recoverable ARR in an initial motion`
                : "Adjust early detection coverage to see protectable ARR."
            }
            barPercent={recoverableArr > 0 ? snowflakeEnabled.unlockRatio * 100 : 0}
            supportingText="Derived from early-detection coverage and deployment economics. Snowflake makes this number credible because signals unify across customers before you fund a custom rebuild."
            timeToValueBadge="Weeks, not quarters"
            timeToValueHint="Cohort visibility before funding a slow custom rebuild."
          />

          <PrimaryValueSlider
            id="sagent-detection"
            label="Earlier issue detection with Snowflake"
            hint="Move right for stronger early coverage — more at-risk ARR becomes realistically recoverable."
            min={10}
            max={85}
            step={1}
            value={earlyDetectionPct}
            onChange={(n) => setEarlyDetectionPct(clamp(Math.round(n), 10, 85))}
            suffix="%"
            formatDisplay={(n) => String(n)}
            anchors={["Limited coverage", "Improving", "Strong", "Leading"]}
            interpretation={interpretation}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <OutputMetricRow label="ARR at risk" value={formatCurrencyCompact(arrAtRisk)} />
            <OutputMetricRow label="Recoverable ARR" value={formatCurrencyCompact(recoverableArr)} />
            <OutputMetricRow label="At-risk deployments" value={formatCount(atRiskDeployments)} />
          </div>

          <SnowflakeAttributionBlock
            lines={[
              "Unifies product, customer success, and deployment signals so issues surface across customers without bespoke plumbing.",
              "Makes “earlier” operational — CS and Product see the same cohort truth before retention damage sets in.",
              "Keeps active rollouts moving: faster detection without a science project on every edge system.",
            ]}
          />

          <InsightBox>{execInsight}</InsightBox>

          <AdvancedAssumptionsPanel>
            <SliderField
              id="sg-deploy"
              label="Dara deployments"
              min={10}
              max={200}
              step={1}
              value={deployments}
              onChange={(n) => setDeployments(clamp(Math.round(n), 10, 200))}
              suffix="none"
              formatDisplay={(n) => formatCount(n)}
            />
            <SliderField
              id="sg-under"
              label="Share underperforming"
              orientationHint="Scales how many deployments are at risk at once."
              min={3}
              max={35}
              step={1}
              value={underPct}
              onChange={(n) => setUnderPct(clamp(n, 3, 35))}
              suffix="%"
              formatDisplay={(n) => String(n)}
            />
            <SliderField
              id="sg-arr"
              label="Average ARR per customer"
              min={120_000}
              max={1_500_000}
              step={10_000}
              value={arr}
              onChange={(n) => setArr(clamp(n, 120_000, 1_500_000))}
              suffix="$"
              formatDisplay={(n) => `$${formatCurrencyInput(n)}`}
            />
          </AdvancedAssumptionsPanel>
        </div>
      </ValueModelCard>

      <ImpactExplanationModal
        open={explainOpen}
        onClose={() => setExplainOpen(false)}
        accountLabel={accountName}
        sections={sections}
      />
    </>
  );
}

/* ——— U.S. FinTech ——— */

function UsFintechImpactModel({ accountName, proofPoint }: { accountName: string; proofPoint: string }) {
  const [annualVolume, setAnnualVolume] = useState(2_800_000_000);
  const [anomalyPct, setAnomalyPct] = useState(4);
  const [lossRatePct, setLossRatePct] = useState(0.35);
  /** Default ~65% along the detection lever — strong, believable first view. */
  const [avoidablePct, setAvoidablePct] = useState(64);
  const [explainOpen, setExplainOpen] = useState(false);

  const volumeImpacted = annualVolume * (anomalyPct / 100);
  const riskExposure = volumeImpacted * (lossRatePct / 100);
  const avoidableRisk = riskExposure * (avoidablePct / 100);

  const snowflakeEnabled = useMemo(
    () => computeFintechSnowflakeEnabled(avoidableRisk, avoidablePct, anomalyPct, lossRatePct),
    [avoidableRisk, avoidablePct, anomalyPct, lossRatePct]
  );

  const interpretation = useMemo(() => {
    if (avoidablePct < 28) {
      return "When detection stays slow, only a small share of downstream loss is realistically avoidable — even when anomalies exist.";
    }
    if (avoidablePct < 48) {
      return "Faster anomaly detection on governed data increases the portion of exposure that becomes avoidable before loss compounds.";
    }
    if (avoidablePct < 72) {
      return "Strong detection improvement materially raises avoidable risk — the story shifts from reporting lag to measurable risk reduction.";
    }
    return "At high detection leverage, most modeled avoidable risk is within reach in a governed first motion — the right executive conversation.";
  }, [avoidablePct]);

  const execInsight = useMemo(() => {
    const exp = formatCurrencyCompact(riskExposure);
    const av = formatCurrencyCompact(avoidableRisk);
    const snow = formatCurrencyCompact(snowflakeEnabled.value);
    return `Risk reduction enabled by Snowflake is directionally ${snow} on ${av} avoidable risk (${exp} total exposure). Faster signal on governed data — audit-friendly, not a shadow-copy story.`;
  }, [avoidableRisk, riskExposure, snowflakeEnabled.value]);

  const sections: ImpactExplanationSection[] = useMemo(
    () => [
      {
        title: "Snowflake-enabled value",
        body: `Risk reduction enabled by Snowflake is ${formatCurrencyCompact(snowflakeEnabled.value)} — ${formatPercent(snowflakeEnabled.unlockRatio * 100, 0)} of ${formatCurrencyCompact(avoidableRisk)} avoidable risk when ${formatPercent(avoidablePct)} of downstream loss is avoidable with faster detection. That is the governed, near-term reduction leadership can underwrite.`,
      },
      {
        title: "Total exposure",
        body: `Total exposure is ${formatCurrencyCompact(riskExposure)} on ${formatCurrencyCompact(volumeImpacted)} impacted volume (${formatCurrencyCompact(annualVolume)} annual flow, ${formatPercent(anomalyPct, 1)} anomaly share, ${formatPercent(lossRatePct, 2)} loss on affected flow). Avoidable risk before Snowflake attribution is ${formatCurrencyCompact(avoidableRisk)}. ${proofPoint}`,
      },
      {
        title: "Why Snowflake makes this achievable",
        body: `At this scale, reducing detection lag even modestly materially reduces exposure. Snowflake matters because it accelerates signal on governed data you already control — no shadow copies, evidence that holds up in audit and risk conversations.`,
      },
      {
        title: "Why this is a strong first workload",
        body: `One reporting domain: side-by-side timing vs. delayed reporting with lineage and access controls in the readout. Prove speed with evidence, then widen the governed footprint.`,
      },
    ],
    [
      annualVolume,
      anomalyPct,
      avoidablePct,
      avoidableRisk,
      lossRatePct,
      proofPoint,
      riskExposure,
      snowflakeEnabled.unlockRatio,
      snowflakeEnabled.value,
      volumeImpacted,
    ]
  );

  return (
    <>
      <ValueModelCard
        variant="standalone"
        action={<ExplainButton onClick={() => setExplainOpen(true)} />}
        footer={<DirectionalDisclaimer />}
      >
        <div className="space-y-4">
          <ModelIntro>
            One lever: how much downstream loss becomes avoidable as anomaly detection accelerates on governed
            securitization data.
          </ModelIntro>

          <SnowflakeEnabledValueBlock
            variant="hero"
            title="Risk reduction enabled by Snowflake"
            heroEyebrow="Near-term impact"
            heroSubline="At this scale, reducing detection lag even modestly can materially reduce exposure."
            valueDisplay={formatCurrencyCompact(snowflakeEnabled.value)}
            portionLine={
              avoidableRisk > 0
                ? `≈ ${formatPercent(snowflakeEnabled.unlockRatio * 100, 0)} of avoidable risk in an initial motion`
                : "Raise detection leverage to see directional unlock."
            }
            barPercent={avoidableRisk > 0 ? snowflakeEnabled.unlockRatio * 100 : 0}
            supportingText="Derived from the detection lever and workflow economics — not a penetration slider. Snowflake makes this number real because signal lands on governed data without new sprawl."
            timeToValueBadge="Initial value in days"
            timeToValueHint="Faster detection without ungoverned copies or unnecessary movement."
          />

          <PrimaryValueSlider
            id="ft-detection"
            label="Faster anomaly detection with Snowflake"
            hint="Move right for stronger detection leverage — more modeled risk becomes realistically avoidable."
            min={15}
            max={90}
            step={1}
            value={avoidablePct}
            onChange={(n) => setAvoidablePct(clamp(Math.round(n), 15, 90))}
            suffix="%"
            formatDisplay={(n) => String(n)}
            anchors={["Minimal avoidability", "Moderate", "Strong", "Near-max"]}
            interpretation={interpretation}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <OutputMetricRow label="Total risk exposure" value={formatCurrencyCompact(riskExposure)} />
            <OutputMetricRow label="Avoidable risk" value={formatCurrencyCompact(avoidableRisk)} />
            <OutputMetricRow label="Impacted volume" value={formatCurrencyCompact(volumeImpacted)} />
          </div>

          <SnowflakeAttributionBlock
            lines={[
              "Extends secure sharing on data already governed — fewer new seams in a regulated environment.",
              "Surfaces anomalies faster with lineage and access controls execs can defend in audit conversations.",
              "Avoids duplicate stores and shadow paths people take when speed is urgent and governance is non-negotiable.",
            ]}
          />

          <InsightBox>{execInsight}</InsightBox>

          <AdvancedAssumptionsPanel>
            <SliderField
              id="ft-vol"
              label="Annual workflow volume"
              min={400_000_000}
              max={8_000_000_000}
              step={50_000_000}
              value={annualVolume}
              onChange={(n) => setAnnualVolume(clamp(n, 400_000_000, 8_000_000_000))}
              suffix="$"
              formatDisplay={(n) => `$${formatCurrencyInput(n)}`}
            />
            <SliderField
              id="ft-anom"
              label="Share of volume with anomalies"
              min={0.5}
              max={14}
              step={0.5}
              value={anomalyPct}
              onChange={(n) => setAnomalyPct(clamp(n, 0.5, 14))}
              suffix="%"
              formatDisplay={(n) => n.toFixed(1)}
            />
            <SliderField
              id="ft-loss"
              label="Estimated loss rate on affected volume"
              min={0.05}
              max={2}
              step={0.05}
              value={lossRatePct}
              onChange={(n) => setLossRatePct(clamp(n, 0.05, 2))}
              suffix="%"
              formatDisplay={(n) => n.toFixed(2)}
            />
          </AdvancedAssumptionsPanel>
        </div>
      </ValueModelCard>

      <ImpactExplanationModal
        open={explainOpen}
        onClose={() => setExplainOpen(false)}
        accountLabel={accountName}
        sections={sections}
      />
    </>
  );
}
