import type { SoftDeletableDocument } from "@/lib/domain/common";

export type ClientType = "residential" | "airbnb_host" | "property_manager" | "commercial";

export type ClientDocument = SoftDeletableDocument & {
  name: string;
  clientType: ClientType;
  phone: string | null;
  email: string | null;
  notes: string | null;
};

export type CreateClientInput = Omit<ClientDocument, "createdAt" | "updatedAt">;
export type UpdateClientInput = Partial<
  Omit<ClientDocument, "id" | "createdAt" | "updatedAt">
>;

export const clientTypeOptions: Array<{ value: ClientType; label: string }> = [
  { value: "residential", label: "Residential" },
  { value: "airbnb_host", label: "Airbnb host" },
  { value: "property_manager", label: "Property manager" },
  { value: "commercial", label: "Commercial" },
];

export const exampleClient: CreateClientInput = {
  id: "CLI-EXAMPLE",
  name: "Example Client",
  clientType: "residential",
  phone: null,
  email: null,
  notes: null,
  active: true,
};
