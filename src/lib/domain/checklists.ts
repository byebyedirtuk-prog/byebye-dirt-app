import type { DocumentBase } from "@/lib/domain/common";

export type ChecklistStatus = "not_started" | "in_progress" | "completed";

export type ChecklistItem = {
  itemKey: string;
  label: string;
  required: boolean;
  checked: boolean;
  checkedAt: string | null;
  checkedByUid: string | null;
  note: string | null;
};

export type ChecklistDocument = DocumentBase & {
  jobId: string | null;
  propertyId: string | null;
  cleanerId: string | null;
  templateKey: string;
  serviceId: string | null;
  serviceNameSnapshot: string | null;
  status: ChecklistStatus;
  items: ChecklistItem[];
  completedAt: string | null;
};

export type CreateChecklistInput = Omit<ChecklistDocument, "createdAt" | "updatedAt">;
export type UpdateChecklistInput = Partial<
  Omit<ChecklistDocument, "id" | "createdAt" | "updatedAt">
>;

export const exampleChecklist: CreateChecklistInput = {
  id: "CHK-EXAMPLE",
  jobId: null,
  propertyId: null,
  cleanerId: null,
  templateKey: "Airbnb_Turnover",
  serviceId: "SRV-008",
  serviceNameSnapshot: "Holiday Let Cleaning",
  status: "not_started",
  items: [
    {
      itemKey: "TODO-001",
      label: "não especificado - checklist item placeholder",
      required: true,
      checked: false,
      checkedAt: null,
      checkedByUid: null,
      note: null,
    },
  ],
  completedAt: null,
};
