/**
 * Static registry of services mirroring the alpha-preview INFORMATION_ARCHITECTURE.
 *
 * Airtable is the catalogue source of truth for *status* and *ministry*, but
 * its Link field often includes subpage paths (e.g. .../get-birth-certificate/start)
 * which breaks slug extraction.  This registry provides the correct serviceSlug,
 * categorySlug, and hasImplementation flag so the dashboard can reliably match
 * Airtable rows to form-processor-api feature-flag entries.
 *
 * This file will eventually move into a shared package when the repo becomes a
 * monorepo.  Until then, keep it in sync manually with content-directory.ts in
 * alpha-preview.
 */

export type RegistryEntry = {
  title: string;
  serviceSlug: string;
  categorySlug: string;
  categoryTitle: string;
  hasImplementation: boolean;
};

export const SERVICE_REGISTRY: RegistryEntry[] = [
  // ── Family, birth and relationships ──────────────────────────────────
  {
    title: "Register a birth",
    serviceSlug: "register-a-birth",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: true,
  },
  {
    title: "Get a copy of a birth certificate",
    serviceSlug: "get-birth-certificate",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: true,
  },
  {
    title: "Get a copy of a death certificate",
    serviceSlug: "get-death-certificate",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: true,
  },
  {
    title: "Get a copy of a marriage certificate",
    serviceSlug: "get-marriage-certificate",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: true,
  },
  {
    title: "Register a death",
    serviceSlug: "register-a-death",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: false,
  },
  {
    title: "Register a marriage",
    serviceSlug: "register-a-marriage",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: false,
  },
  {
    title: "Marriage licences",
    serviceSlug: "marriage-licences",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: false,
  },
  {
    title: "Apply for a place at a day nursery",
    serviceSlug: "apply-for-a-place-at-a-day-nursery",
    categorySlug: "family-birth-relationships",
    categoryTitle: "Family, birth and relationships",
    hasImplementation: false,
  },

  // ── Work and employment ──────────────────────────────────────────────
  {
    title: "Jobseekers",
    serviceSlug: "jobseekers",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: false,
  },
  {
    title: "Apply to be a Project Protégé mentor",
    serviceSlug: "apply-to-be-a-project-protege-mentor",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: true,
  },
  {
    title: "Apply to the Barbados YouthADVANCE Corps (BYAC)",
    serviceSlug: "apply-to-the-barbados-youthadvance-corps",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: false,
  },
  {
    title: "Register for a Youth Development Programme (YDP) Community Sports Training programme",
    serviceSlug: "register-for-community-sports-training-programme",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: true,
  },
  {
    title: "Register for a summer camp",
    serviceSlug: "register-summer-camp",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: false,
  },
  {
    title: "Apply to volunteer at a sports camp",
    serviceSlug: "apply-to-volunteer-at-a-sports-camp",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: false,
  },
  {
    title: "Apply for a position as a temporary teacher",
    serviceSlug: "apply-for-a-position-as-a-temporary-teacher",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: false,
  },
  {
    title: "Apply to the JobSTART Plus programme",
    serviceSlug: "apply-to-jobstart-plus-programme",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: true,
  },
  {
    title: "Apply for conductor licence",
    serviceSlug: "apply-for-conductor-licence",
    categorySlug: "work-employment",
    categoryTitle: "Work and employment",
    hasImplementation: true,
  },

  // ── Money and financial support ──────────────────────────────────────
  {
    title: "Apply for financial assistance",
    serviceSlug: "apply-financial-assistance",
    categorySlug: "money-financial-support",
    categoryTitle: "Money and financial support",
    hasImplementation: false,
  },
  {
    title: "EZPay",
    serviceSlug: "ezpay",
    categorySlug: "money-financial-support",
    categoryTitle: "Money and financial support",
    hasImplementation: false,
  },
  {
    title: "Tax online",
    serviceSlug: "tax-online",
    categorySlug: "money-financial-support",
    categoryTitle: "Money and financial support",
    hasImplementation: false,
  },
  {
    title: "Get disaster relief assistance",
    serviceSlug: "get-disaster-relief-assistance",
    categorySlug: "money-financial-support",
    categoryTitle: "Money and financial support",
    hasImplementation: false,
  },
  {
    title: "Get a Primary School Textbook Grant",
    serviceSlug: "get-a-primary-school-textbook-grant",
    categorySlug: "money-financial-support",
    categoryTitle: "Money and financial support",
    hasImplementation: true,
  },

  // ── Travel, ID and citizenship ───────────────────────────────────────
  {
    title: "Apply for a passport",
    serviceSlug: "apply-for-a-passport",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Visa information",
    serviceSlug: "visa-information",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Visitor permit application",
    serviceSlug: "visitor-permit-application",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Medical requirements",
    serviceSlug: "medical-requirements",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Apply for a driver's licence",
    serviceSlug: "apply-for-a-drivers-licence",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "National registration",
    serviceSlug: "national-registration",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Getting around Barbados",
    serviceSlug: "getting-around-barbados",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Local information",
    serviceSlug: "local-information",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Ports of Entry",
    serviceSlug: "ports-of-entry",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Get a document notarised",
    serviceSlug: "get-a-document-notarised",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: false,
  },
  {
    title: "Redirect my personal mail",
    serviceSlug: "post-office-redirection-individual",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: true,
  },
  {
    title: "Tell the Post Office someone has died",
    serviceSlug: "post-office-redirection-deceased",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: true,
  },
  {
    title: "Redirect my business mail",
    serviceSlug: "post-office-redirection-business",
    categorySlug: "travel-id-citizenship",
    categoryTitle: "Travel, ID and citizenship",
    hasImplementation: true,
  },

  // ── Business and trade ───────────────────────────────────────────────
  {
    title: "Start a business",
    serviceSlug: "start-a-business",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Registering a business name",
    serviceSlug: "registering-a-business-name",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Business policies and law",
    serviceSlug: "business-policies-and-law",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Financial services for businesses",
    serviceSlug: "financial-services-for-businesses",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Government requirements",
    serviceSlug: "government-requirements",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Information about business tax",
    serviceSlug: "information-about-business-tax",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Get a permit to play loud music",
    serviceSlug: "loud-music-permit",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: false,
  },
  {
    title: "Apply for a licence to sell goods or services at a beach or park",
    serviceSlug: "sell-goods-services-beach-park",
    categorySlug: "business-trade",
    categoryTitle: "Business and trade",
    hasImplementation: true,
  },

  // ── Public safety ────────────────────────────────────────────────────
  {
    title: "Report a concern about a child",
    serviceSlug: "report-a-concern-about-a-child",
    categorySlug: "public-safety",
    categoryTitle: "Public safety",
    hasImplementation: false,
  },
  {
    title: "Report elderly abuse",
    serviceSlug: "report-elderly-abuse",
    categorySlug: "public-safety",
    categoryTitle: "Public safety",
    hasImplementation: false,
  },
  {
    title: "Get support for a victim of domestic abuse",
    serviceSlug: "get-support-for-a-victim-of-domestic-abuse",
    categorySlug: "public-safety",
    categoryTitle: "Public safety",
    hasImplementation: false,
  },
];

/**
 * Lookup map keyed by lowercased title for case-insensitive matching
 * against Airtable "Service Name" values.
 */
export const REGISTRY_BY_TITLE = new Map(
  SERVICE_REGISTRY.map((entry) => [entry.title.toLowerCase(), entry])
);

/**
 * Lookup map keyed by serviceSlug for matching against form-processor-api
 * config entries that may not have a corresponding Airtable row.
 */
export const REGISTRY_BY_SLUG = new Map(
  SERVICE_REGISTRY.map((entry) => [entry.serviceSlug, entry])
);
