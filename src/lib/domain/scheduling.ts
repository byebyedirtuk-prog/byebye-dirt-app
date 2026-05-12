import type { DocumentBase } from "@/lib/domain/common";
import type { FirestoreTimestamp } from "@/types/firestore";

export type ScheduleStatus = "available" | "blocked" | "assigned";
export type ScheduleSource = "manual" | "airbnb" | "system";

export type ScheduleDocument = DocumentBase & {
  cleanerId: string | null;
  propertyId: string | null;
  jobId: string | null;
  startsAt: FirestoreTimestamp;
  endsAt: FirestoreTimestamp;
  status: ScheduleStatus;
  source: ScheduleSource;
  notes: string | null;
};

export type CreateScheduleInput = Omit<ScheduleDocument, "createdAt" | "updatedAt">;
export type UpdateScheduleInput = Partial<
  Omit<ScheduleDocument, "id" | "createdAt" | "updatedAt">
>;
