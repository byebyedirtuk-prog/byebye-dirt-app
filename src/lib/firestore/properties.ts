import type {
  CreatePropertyInput,
  PropertyDocument,
  UpdatePropertyInput,
} from "@/lib/domain/properties";
import { validateProperty } from "@/lib/validation/properties";
import { operationalCollections } from "@/lib/firestore/collections";
import { createRepository } from "@/lib/firestore/repository";

export const propertiesRepository = createRepository<
  PropertyDocument,
  CreatePropertyInput,
  UpdatePropertyInput
>({
  collectionName: operationalCollections.properties,
  validateCreate: validateProperty,
});
