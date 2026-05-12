import type { ClientDocument, CreateClientInput, UpdateClientInput } from "@/lib/domain/clients";
import { createRepository } from "@/lib/firestore/repository";
import { operationalCollections } from "@/lib/firestore/collections";
import { validateClient } from "@/lib/validation/clients";

export const clientsRepository = createRepository<
  ClientDocument,
  CreateClientInput,
  UpdateClientInput
>({
  collectionName: operationalCollections.clients,
  validateCreate: validateClient,
});
