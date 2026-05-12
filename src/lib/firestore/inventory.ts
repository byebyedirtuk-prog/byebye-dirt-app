import type {
  CreateInventoryInput,
  InventoryDocument,
  UpdateInventoryInput,
} from "@/lib/domain/inventory";
import { createRepository } from "@/lib/firestore/repository";
import { operationalCollections } from "@/lib/firestore/collections";
import { validateInventory } from "@/lib/validation/inventory";

export const inventoryRepository = createRepository<
  InventoryDocument,
  CreateInventoryInput,
  UpdateInventoryInput
>({
  collectionName: operationalCollections.inventory,
  validateCreate: validateInventory,
});
