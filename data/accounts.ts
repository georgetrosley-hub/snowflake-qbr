import type { Account } from "@/types";

/**
 * Accounts: N/A for now. Internal GTM AE hub is account-agnostic until accounts are configured.
 */
export const accounts: Account[] = [
  {
    id: "na",
    name: "N/A",
    tam: 0,
    employeeCount: 0,
    developerPopulation: 0,
    aiMaturityScore: 0,
    securitySensitivity: 0,
    complianceComplexity: 0,
    competitivePressure: 0,
    existingVendorFootprint: [],
    executiveSponsors: [],
    firstWedge: "",
    estimatedLandValue: 0,
    estimatedExpansionValue: 0,
    topBlockers: [],
    topExpansionPaths: [],
  },
];

/** Default account — N/A until accounts are set up */
export const defaultAccountId = "na";
