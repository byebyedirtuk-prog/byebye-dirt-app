import type {
  CleanerDocument,
  CreateCleanerInput,
  UpdateCleanerInput,
} from "@/lib/domain/cleaners";
import { createRepository } from "@/lib/firestore/repository";
import { operationalCollections } from "@/lib/firestore/collections";
import { validateCleaner } from "@/lib/validation/cleaners";

export const cleanersRepository = createRepository<
  CleanerDocument,
  CreateCleanerInput,
  UpdateCleanerInput
>({
  collectionName: operationalCollections.cleaners,
  validateCreate: validateCleaner,
});
