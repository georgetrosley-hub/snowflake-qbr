/**
 * Simulated territory pipeline — multiple accounts at different stages.
 * Gives the hiring manager the "territory owner" view.
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

export const pipelineRows: PipelineRow[] = [
  {
    accountId: "pfizer",
    accountName: "Pfizer",
    stage: "Pilot Design",
    valueM: 2.5,
    nextStep: "Legal review",
  },
  {
    accountId: "jpmorgan",
    accountName: "JPMorgan Chase",
    stage: "Security Review",
    valueM: 3.5,
    nextStep: "Architecture review Mar 18",
  },
  {
    accountId: "comcast",
    accountName: "Comcast",
    stage: "Security Review",
    valueM: 1.2,
    nextStep: "Deployment narrative due",
  },
  {
    accountId: "morgan-stanley",
    accountName: "Morgan Stanley",
    stage: "Champion Build",
    valueM: 2.5,
    nextStep: "Wealth mgmt intro",
  },
  {
    accountId: "salesforce",
    accountName: "Salesforce",
    stage: "Discovery",
    valueM: 2.2,
    nextStep: "Platform eng discovery",
  },
  {
    accountId: "nvidia",
    accountName: "NVIDIA",
    stage: "Discovery",
    valueM: 2.8,
    nextStep: "AI/ML team intro",
  },
  {
    accountId: "capital-one",
    accountName: "Capital One",
    stage: "POV Selected",
    valueM: 2.0,
    nextStep: "Pilot scope draft",
  },
  {
    accountId: "adp",
    accountName: "ADP",
    stage: "Champion Build",
    valueM: 0.8,
    nextStep: "HR ops demo",
  },
];
