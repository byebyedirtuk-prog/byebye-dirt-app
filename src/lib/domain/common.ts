import type { ActiveStatus, CurrencyCode, FirestoreAuditFields } from "@/types/firestore";

export type DocumentBase = FirestoreAuditFields & {
  id: string;
};

export type SoftDeletableDocument = DocumentBase & {
  active: boolean;
};

export type AddressSnapshot = {
  addressLine1: string;
  postcode: string;
};

export type MoneyAmount = {
  amount: number;
  currency: CurrencyCode;
};

export type OperationalStatus = ActiveStatus;
