import type { DocumentBase } from "@/lib/domain/common";

export type InventoryStatus = "not_started" | "in_progress" | "completed";
export type InventoryScope = "job" | "property";

export type InventoryItem = {
  itemKey: string;
  label: string;
  expectedQty: number | null;
  countedQty: number | null;
  restockNeeded: boolean;
  note: string | null;
};

export type InventoryDocument = DocumentBase & {
  scope: InventoryScope;
  jobId: string | null;
  propertyId: string | null;
  templateKey: string;
  status: InventoryStatus;
  items: InventoryItem[];
  completedAt: string | null;
  completedByUid: string | null;
};

export type CreateInventoryInput = Omit<InventoryDocument, "createdAt" | "updatedAt">;
export type UpdateInventoryInput = Partial<
  Omit<InventoryDocument, "id" | "createdAt" | "updatedAt">
>;

export const exampleInventory: CreateInventoryInput = {
  id: "INV-EXAMPLE",
  scope: "job",
  jobId: null,
  propertyId: null,
  templateKey: "INV_AIRBNB_STANDARD",
  status: "not_started",
  items: [
    {
      itemKey: "TODO-001",
      label: "não especificado - inventory item placeholder",
      expectedQty: null,
      countedQty: null,
      restockNeeded: false,
      note: null,
    },
  ],
  completedAt: null,
  completedByUid: null,
};
