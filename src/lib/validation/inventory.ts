import type { CreateInventoryInput } from "@/lib/domain/inventory";
import {
  fail,
  isRecord,
  ok,
  requireArray,
  requireEnum,
  requireOptionalString,
  requireString,
  type ValidationResult,
} from "@/lib/validation/schema";

const inventoryScopes = ["job", "property"] as const;
const inventoryStatuses = ["not_started", "in_progress", "completed"] as const;

export function validateInventory(value: unknown): ValidationResult<CreateInventoryInput> {
  if (!isRecord(value)) {
    return fail(["Inventory must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireEnum(value, "scope", inventoryScopes, errors);
  requireOptionalString(value, "jobId", errors);
  requireOptionalString(value, "propertyId", errors);
  requireString(value, "templateKey", errors);
  requireEnum(value, "status", inventoryStatuses, errors);
  requireArray(value, "items", errors);
  requireOptionalString(value, "completedAt", errors);
  requireOptionalString(value, "completedByUid", errors);

  return errors.length > 0 ? fail(errors) : ok(value as CreateInventoryInput);
}
