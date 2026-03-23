/**
 * Territory pipeline. Populate when you receive accounts from the previous rep.
 * Until then, pipeline is empty.
 */

export type PipelineStage =
  | "Discovery"
  | "Champion Build"
  | "POV Selected"
  | "Pilot Design"
  | "Security Review"
  | "Legal Review"
  | "Procurement"
  | "Negotiation"
  | "Closed";

export interface PipelineRow {
  accountId: string;
  accountName: string;
  stage: PipelineStage;
  valueM: number;
  nextStep: string;
}

/** No accounts until you receive the 15 from the previous rep. */
export const pipelineRows: PipelineRow[] = [
  {
    accountId: "us-financial-technology",
    accountName: "U.S. Financial Technology",
    stage: "POV Selected",
    valueM: 78,
    nextStep: "Schedule governance-owner + security path alignment on the scoped regulatory anomaly workflow.",
  },
  {
    accountId: "sagent-lending",
    accountName: "Sagent Lending",
    stage: "Champion Build",
    valueM: 58,
    nextStep: "Confirm 1–2 at-risk Dara deployments and finalize success metrics with CS + Product Ops.",
  },
  {
    accountId: "ciena-corp",
    accountName: "Ciena Corp",
    stage: "Discovery",
    valueM: 64,
    nextStep: "Deliver a CFO-ready backlog risk + margin bridge plan for 2–3 AI deals with an agreed refresh SLA.",
  },
];
