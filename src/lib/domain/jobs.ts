import type { AddressSnapshot, DocumentBase } from "@/lib/domain/common";
import type { FirestoreTimestamp } from "@/types/firestore";

export type JobStatus = "draft" | "scheduled" | "in_progress" | "completed" | "cancelled";
export type JobSource = "manual" | "airbnb";

export type JobServiceSnapshot = {
  serviceId: string;
  serviceNameSnapshot: string;
  categorySnapshot: string;
  durationHours: number;
  checklistTemplateKey: string | null;
  inventoryRequired: boolean;
  photosRequired: boolean;
  notes: string | null;
  sortOrder: number;
};

export type JobSummary = {
  serviceCount: number;
  totalDurationHours: number;
  inventoryRequired: boolean;
  photosRequired: boolean;
  checklistTemplateKeys: string[];
};

export type JobDocument = DocumentBase & {
  source: JobSource;
  externalBookingId: string | null;
  scheduledStart: FirestoreTimestamp;
  scheduledEnd: FirestoreTimestamp;
  clientId: string | null;
  clientNameSnapshot: string;
  propertyId: string;
  propertyNameSnapshot: string;
  propertyAddressSnapshot: AddressSnapshot;
  assignedCleanerId: string | null;
  assignedCleanerUid: string | null;
  assignedCleanerNameSnapshot: string;
  status: JobStatus;
  services: JobServiceSnapshot[];
  summary: JobSummary;
  customerPrice: number;
  cleanerPay: number;
  bonus: number;
  tip: number;
  currency: "GBP";
  notes: string | null;
  createdByUid: string;
  startedAt: string | null;
  completedAt: string | null;
};

export type CreateJobInput = Omit<JobDocument, "createdAt" | "updatedAt" | "summary"> & {
  summary?: JobSummary;
};

export type UpdateJobInput = Partial<Omit<JobDocument, "id" | "createdAt" | "updatedAt">>;

export function buildJobSummary(services: JobServiceSnapshot[]): JobSummary {
  return {
    serviceCount: services.length,
    totalDurationHours: services.reduce((total, service) => total + service.durationHours, 0),
    inventoryRequired: services.some((service) => service.inventoryRequired),
    photosRequired: services.some((service) => service.photosRequired),
    checklistTemplateKeys: Array.from(
      new Set(
        services
          .map((service) => service.checklistTemplateKey)
          .filter((templateKey): templateKey is string => Boolean(templateKey)),
      ),
    ),
  };
}
