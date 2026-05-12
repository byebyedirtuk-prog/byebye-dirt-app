export const operationalCollections = {
  clients: "clients",
  properties: "properties",
  jobs: "jobs",
  checklists: "checklists",
  cleaners: "cleaners",
  inventory: "inventory",
  schedules: "schedules",
} as const;

export type OperationalCollectionName =
  (typeof operationalCollections)[keyof typeof operationalCollections];
