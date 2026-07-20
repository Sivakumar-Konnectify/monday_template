export const ROOT_DOMAIN = ".konnectifyapp.co";
export const API_PATH = "/ipaas/api";
export const UI_PATH = "/ipaas/ui";

export const APP_IDS = {
  monday: "mondaycrm-1.0.0",
  chargebee: "chargebee-1.0.0",
} as const;

// ─── Secondary app config ────────────────────────────────────────────────────
// Monday.com is the fixed primary app. SECONDARY_APP describes whichever app
// it's currently paired with (Chargebee today). This is the ONLY place you
// need to edit to swap it out for Hubspot/etc — SetupWizard.tsx and
// storageService.ts both import this instead of hardcoding "chargebee".
//
// NOTE: swapping this alone does NOT swap the workflow template — see
// WORKFLOW_TEMPLATES below, its `id` points at a template folder whose
// actual contents ("Chargebee -> Monday contact sync") are app-specific.
// You'll need a new template id whenever the secondary app changes.
export const SECONDARY_APP = {
  // internal identifier — used as the Step id / discriminated union key in
  // SetupWizard.tsx, and as the storage key suffix in storageService.ts.
  key: "chargebee",

  // the id connectionService/konnectifyClient use to identify this app
  appId: APP_IDS.chargebee,

  // human-facing name, properly capitalized
  displayName: "Chargebee",

  // name sent to connectionService.create/edit
  connectionName: "Chargebee Connection",

  // wizard step indicator label
  stepLabel: "Connect Chargebee",

  // button copy
  connectButtonText: "Connect Chargebee",
  connectedButtonText: "Chargebee Connected",

  // SecondaryAppStep form copy
  panelSubtitle: "Enter your Chargebee domain and API key to link your account",
  domainFieldLabel: "Chargebee Domain",
  domainPlaceholder: "yourcompany",
  domainHelpText: "Enter the domain, for example https://acme.chargebee.com",
  domainSuffix: ".chargebee.com",
  apiKeyHelpText: "Find your API key in Chargebee → Settings → API Settings",

  // TemplatesStep bullet copy
  templateDescription: "Chargebee ↔ Monday contacts",
} as const;

export const templateFolderId = 3 as const;
export const orgId = "27" as const; 
export const projectId = "27" as const;


export const WORKFLOW_TEMPLATES = [
  {
    id: 4,
    name: "Subscription Sync",
    description:
      "Syncs newly created subscription to Monday",
  }
] as const;

export const ACCOUNT_SETTINGS_SECTIONS = [
  { id: "connections", label: "Connections" },
] as const;

export const BOARD_VIEW_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "workflows", label: "Workflows" },
  { id: "logs", label: "Event Logs" },
] as const;

export type AccountSettingsSection =
  (typeof ACCOUNT_SETTINGS_SECTIONS)[number]["id"];
export type BoardViewSection = (typeof BOARD_VIEW_SECTIONS)[number]["id"];