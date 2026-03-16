import type { Competitor } from "@/types";

export const competitorCategories = [
  "frontier",
  "coding",
  "search",
  "workflow",
  "cloud",
  "vertical",
] as const;

export const competitors: Competitor[] = [
  {
    id: "knowbe4",
    name: "KnowBe4",
    category: "vertical",
    strengthAreas: ["Phishing sims", "broad adoption", "Kevin Mitnick brand", "large library"],
    claudeDifferentiation: ["Deepfake & AI threat training", "TikTok-style microlearning", "just-in-time learning on failure", "security culture vs checkbox"],
    accountRiskLevel: 85,
    detectedFootprint: "KnowBe4 Security Awareness, simulated phishing",
  },
  {
    id: "cofense",
    name: "Cofense",
    category: "vertical",
    strengthAreas: ["Phishing detection", "reporting", "incident response", "email security"],
    claudeDifferentiation: ["Deepfake simulations", "engagement-first content", "always-fresh modules", "microlearning on failure"],
    accountRiskLevel: 78,
    detectedFootprint: "Cofense PhishMe, Cofense Vision",
  },
  {
    id: "proofpoint",
    name: "Proofpoint Security Awareness",
    category: "workflow",
    strengthAreas: ["Email security bundle", "enterprise footprint", "compliance reporting"],
    claudeDifferentiation: ["AI-generated threat training", "deepfake defense", "engagement and culture", "short-form content"],
    accountRiskLevel: 82,
    detectedFootprint: "Proofpoint Security Awareness, ThreatSim",
  },
  {
    id: "sans",
    name: "SANS Security Awareness",
    category: "vertical",
    strengthAreas: ["Authority brand", "certifications", "enterprise training"],
    claudeDifferentiation: ["Modern engagement", "deepfake and AI threats", "microlearning", "automation"],
    accountRiskLevel: 70,
    detectedFootprint: "SANS Security Awareness",
  },
  {
    id: "mimecast",
    name: "Mimecast",
    category: "cloud",
    strengthAreas: ["Email security", "resilience", "integrated stack"],
    claudeDifferentiation: ["Dedicated awareness experience", "deepfake training", "culture over compliance"],
    accountRiskLevel: 65,
  },
];

export function getCompetitorsByAccount(accountId: string): Competitor[] {
  return competitors.map((c) => ({
    ...c,
    accountRiskLevel: c.accountRiskLevel,
  }));
}
