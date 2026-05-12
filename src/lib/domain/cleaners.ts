import type { SoftDeletableDocument } from "@/lib/domain/common";

export type CleanerPaymentType = "hourly" | "fixed" | "not_specified";

export type CleanerDocument = SoftDeletableDocument & {
  userUid: string | null;
  fullName: string;
  phone: string | null;
  email: string | null;
  paymentType: CleanerPaymentType;
  hourlyRate: number | null;
  serviceArea: string | null;
  notes: string | null;
};

export type CreateCleanerInput = Omit<CleanerDocument, "createdAt" | "updatedAt">;
export type UpdateCleanerInput = Partial<
  Omit<CleanerDocument, "id" | "createdAt" | "updatedAt">
>;

export const exampleCleaner: CreateCleanerInput = {
  id: "CLN-EXAMPLE",
  active: true,
  userUid: null,
  fullName: "Example Cleaner",
  phone: null,
  email: null,
  paymentType: "not_specified",
  hourlyRate: null,
  serviceArea: null,
  notes: null,
};
