import type {
  ApiEnvelope,
  CatalogueStatus,
  ServiceAccessConfig,
  ServiceSummary,
} from "./types";

const PROCESSING_API_URL = import.meta.env.VITE_PROCESSING_API_URL as string;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID as string;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME as string;
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string;

// Raw field names as they appear in the Airtable table.
// All fields are optional because Airtable omits empty fields from the API
// response entirely rather than returning null — any field can be absent.
type AirtableServiceFields = {
  "Service Name"?: string;
  // Single-select: "Backlog" means not yet implemented; all other values are treated as implemented
  Status?: string;
  Ministry?: string;
  // Full URL to the service on the portal, e.g. https://alpha.gov.bb/services/birth-certificate
  Link?: string;
};

type AirtableRecord = {
  id: string;
  fields: AirtableServiceFields;
};

type AirtableResponse = {
  records: AirtableRecord[];
  offset?: string;
};

/**
 * Normalises the raw Airtable "Status" string to a CatalogueStatus value.
 * Matching is case-insensitive to handle inconsistent Airtable entries.
 * Unknown values fall back to "backlog".
 */
function parseCatalogueStatus(raw: string): CatalogueStatus {
  switch (raw.toLowerCase().trim()) {
    case "public":
      return "public";
    case "backlog":
      return "backlog";
    case "in progress":
    case "in-progress":
      return "in-progress";
    case "feature flagged":
    case "feature-flagged":
      return "feature-flagged";
    case "consider next":
    case "consider-next":
      return "consider-next";
    default:
      return "backlog";
  }
}

/** Services with these statuses have a deployed form implementation. */
const IMPLEMENTED_STATUSES = new Set<CatalogueStatus>([
  "public",
  "feature-flagged",
]);

const NON_ALPHANUMERIC_RE = /[^a-z0-9]+/g;
const LEADING_TRAILING_HYPHEN_RE = /^-|-$/g;
const TRAILING_SLASH_RE = /\/$/;

/**
 * Converts a ministry name to a URL-safe slug.
 * e.g. "Ministry of Health & Wellness" → "ministry-of-health-wellness"
 */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_RE, "-")
    .replace(LEADING_TRAILING_HYPHEN_RE, "");
}

/**
 * Extracts the final path segment from a URL or path string.
 * e.g. "https://alpha.gov.bb/services/birth-certificate" → "birth-certificate"
 */
function extractSlugFromLink(link: string): string {
  try {
    const pathname = new URL(link).pathname;
    return pathname.replace(TRAILING_SLASH_RE, "").split("/").pop() ?? link;
  } catch {
    // Handle plain slugs or relative paths that aren't valid URLs
    return link.replace(TRAILING_SLASH_RE, "").split("/").pop() ?? link;
  }
}

// --- Services metadata (Airtable) -------------------------------------------

/**
 * Fetches the full service catalogue from Airtable, handling pagination
 * automatically. Airtable caps responses at 100 records per page and signals
 * more pages via an `offset` token in the response body.
 */
export async function fetchServices(): Promise<ServiceSummary[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`
    );
    if (offset) {
      url.searchParams.set("offset", offset);
    }

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch services from Airtable: ${res.status}`);
    }

    const json: AirtableResponse = await res.json();
    records.push(...json.records);
    offset = json.offset;
  } while (offset);

  return records.map((record) => {
    const ministry = record.fields.Ministry ?? "";
    const catalogueStatus = parseCatalogueStatus(record.fields.Status ?? "");

    return {
      serviceSlug: extractSlugFromLink(record.fields.Link ?? ""),
      title: record.fields["Service Name"] ?? "",
      categoryTitle: ministry,
      categorySlug: toSlug(ministry),
      catalogueStatus,
      hasImplementation: IMPLEMENTED_STATUSES.has(catalogueStatus),
      // Subpage slugs are not tracked in Airtable — mergeServicesWithConfigs
      // falls back to the slugs already known to the form-processor-api
      subPageSlugs: [],
    };
  });
}

// --- Feature flag configs (form-processor-api) ------------------------------

export async function fetchServiceConfigs(): Promise<ServiceAccessConfig[]> {
  const res = await fetch(`${PROCESSING_API_URL}/services`);

  if (!res.ok) {
    throw new Error(`Failed to fetch service configs: ${res.status}`);
  }

  const json: ApiEnvelope<ServiceAccessConfig[]> = await res.json();
  return json.data;
}

async function patchFeatureFlag(
  url: string,
  body: Record<string, unknown>,
  accessToken: string
): Promise<ServiceAccessConfig> {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update feature flag: ${res.status} ${text}`);
  }

  const json: ApiEnvelope<ServiceAccessConfig> = await res.json();
  return json.data;
}

/**
 * Toggles the service-level feature flag.
 *
 * When subpageSlugs is provided the same isProtected value is also applied
 * to each listed subpage in the same request (cascade on toggle).
 */
export function updateFeatureFlag(
  serviceSlug: string,
  isProtected: boolean,
  accessToken: string,
  subpageSlugs?: string[]
): Promise<ServiceAccessConfig> {
  return patchFeatureFlag(
    `${PROCESSING_API_URL}/services/${serviceSlug}/feature-flag`,
    { isProtected, ...(subpageSlugs && { subpageSlugs }) },
    accessToken
  );
}

export function updateSubpageFeatureFlag(
  serviceSlug: string,
  subpageSlug: string,
  isProtected: boolean,
  accessToken: string
): Promise<ServiceAccessConfig> {
  return patchFeatureFlag(
    `${PROCESSING_API_URL}/services/${serviceSlug}/subpages/${subpageSlug}/feature-flag`,
    { isProtected },
    accessToken
  );
}
