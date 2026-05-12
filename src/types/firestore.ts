import type { FieldValue, Timestamp } from "firebase/firestore";

export type FirestoreTimestamp = Timestamp;
export type ServerTimestamp = FieldValue;

export type FirestoreAuditFields = {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
};

export type FirestoreCreateAuditFields = {
  createdAt: ServerTimestamp;
  updatedAt: ServerTimestamp;
};

export type FirestoreUpdateAuditFields = {
  updatedAt: ServerTimestamp;
};

export type ActiveStatus = "active" | "inactive";
export type CurrencyCode = "GBP";
