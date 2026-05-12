import type {
  ChecklistDocument,
  CreateChecklistInput,
  UpdateChecklistInput,
} from "@/lib/domain/checklists";
import { createRepository } from "@/lib/firestore/repository";
import { operationalCollections } from "@/lib/firestore/collections";
import { validateChecklist } from "@/lib/validation/checklists";

export const checklistsRepository = createRepository<
  ChecklistDocument,
  CreateChecklistInput,
  UpdateChecklistInput
>({
  collectionName: operationalCollections.checklists,
  validateCreate: validateChecklist,
});
