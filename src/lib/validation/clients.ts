import type { CreateClientInput } from "@/lib/domain/clients";
import {
  fail,
  isRecord,
  ok,
  requireBoolean,
  requireEnum,
  requireOptionalString,
  requireString,
  type ValidationResult,
} from "@/lib/validation/schema";

const clientTypes = ["residential", "airbnb_host", "property_manager", "commercial"] as const;

export function validateClient(value: unknown): ValidationResult<CreateClientInput> {
  if (!isRecord(value)) {
    return fail(["Client must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireString(value, "name", errors);
  requireEnum(value, "clientType", clientTypes, errors);
  requireOptionalString(value, "phone", errors);
  requireOptionalString(value, "email", errors);
  requireOptionalString(value, "notes", errors);
  requireBoolean(value, "active", errors);

  return errors.length > 0 ? fail(errors) : ok(value as CreateClientInput);
}
