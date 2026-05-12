import type { AddressSnapshot, SoftDeletableDocument } from "@/lib/domain/common";

export type PropertyType = "airbnb" | "residential" | "commercial" | "not_specified";

export type AirbnbIntegrationState = {
  externalListingId: string | null;
  channel: "airbnb" | "not_connected";
  lastSyncedAt: string | null;
};

export type PropertyDocument = SoftDeletableDocument & {
  clientId: string | null;
  clientNameSnapshot: string;
  name: string;
  address: AddressSnapshot;
  propertyType: PropertyType;
  accessNotes: string | null;
  defaultCleanerId: string | null;
  airbnb: AirbnbIntegrationState;
};

export type CreatePropertyInput = Omit<PropertyDocument, "createdAt" | "updatedAt">;
export type UpdatePropertyInput = Partial<
  Omit<PropertyDocument, "id" | "createdAt" | "updatedAt">
>;

export const exampleProperty: CreatePropertyInput = {
  id: "PRP-EXAMPLE",
  active: true,
  clientId: null,
  clientNameSnapshot: "não especificado",
  name: "Example Airbnb Flat",
  address: {
    addressLine1: "não especificado",
    postcode: "não especificado",
  },
  propertyType: "airbnb",
  accessNotes: null,
  defaultCleanerId: null,
  airbnb: {
    externalListingId: null,
    channel: "not_connected",
    lastSyncedAt: null,
  },
};
