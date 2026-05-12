import { Timestamp } from "firebase/firestore";
import { exampleChecklist } from "@/lib/domain/checklists";
import { exampleClient } from "@/lib/domain/clients";
import { exampleCleaner } from "@/lib/domain/cleaners";
import { exampleInventory } from "@/lib/domain/inventory";
import type { CreateJobInput } from "@/lib/domain/jobs";
import { buildJobSummary } from "@/lib/domain/jobs";
import { exampleProperty } from "@/lib/domain/properties";
import type { CreateScheduleInput } from "@/lib/domain/scheduling";

const startsAt = Timestamp.fromDate(new Date("2026-05-12T10:00:00.000Z"));
const endsAt = Timestamp.fromDate(new Date("2026-05-12T11:30:00.000Z"));

export const exampleJob: CreateJobInput = {
  id: "JOB-EXAMPLE",
  source: "manual",
  externalBookingId: null,
  scheduledStart: startsAt,
  scheduledEnd: endsAt,
  clientId: exampleClient.id,
  clientNameSnapshot: exampleClient.name,
  propertyId: exampleProperty.id,
  propertyNameSnapshot: exampleProperty.name,
  propertyAddressSnapshot: exampleProperty.address,
  assignedCleanerId: exampleCleaner.id,
  assignedCleanerUid: null,
  assignedCleanerNameSnapshot: exampleCleaner.fullName,
  status: "scheduled",
  services: [
    {
      serviceId: "SRV-008",
      serviceNameSnapshot: "Holiday Let Cleaning",
      categorySnapshot: "airbnb",
      durationHours: 1.5,
      checklistTemplateKey: "Airbnb_Turnover",
      inventoryRequired: true,
      photosRequired: true,
      notes: null,
      sortOrder: 1,
    },
  ],
  customerPrice: 0,
  cleanerPay: 0,
  bonus: 0,
  tip: 0,
  currency: "GBP",
  notes: null,
  createdByUid: "system",
  startedAt: null,
  completedAt: null,
};

export const exampleSchedule: CreateScheduleInput = {
  id: "SCH-EXAMPLE",
  cleanerId: exampleCleaner.id,
  propertyId: exampleProperty.id,
  jobId: exampleJob.id,
  startsAt,
  endsAt,
  status: "assigned",
  source: "manual",
  notes: null,
};

export const operationalMockSeeds = {
  properties: [exampleProperty],
  clients: [exampleClient],
  cleaners: [exampleCleaner],
  jobs: [
    {
      ...exampleJob,
      summary: buildJobSummary(exampleJob.services),
    },
  ],
  checklists: [exampleChecklist],
  inventory: [exampleInventory],
  schedules: [exampleSchedule],
};
