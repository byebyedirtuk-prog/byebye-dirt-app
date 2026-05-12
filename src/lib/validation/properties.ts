import type { CreatePropertyInput } from "@/lib/domain/properties";
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

const propertyTypes = ["airbnb", "residential", "commercial", "not_specified"] as const;

export function validateProperty(value: unknown): ValidationResult<CreatePropertyInput> {
  if (!isRecord(value)) {
    return fail(["Property must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireBoolean(value, "active", errors);
  requireOptionalString(value, "clientId", errors);
  requireString(value, "clientNameSnapshot", errors);
  requireString(value, "name", errors);
  requireEnum(value, "propertyType", propertyTypes, errors);
  requireOptionalString(value, "accessNotes", errors);
  requireOptionalString(value, "defaultCleanerId", errors);

  if (!isRecord(value.address)) {
    errors.push("address is required.");
  } else {
    requireString(value.address, "addressLine1", errors);
    requireString(value.address, "postcode", errors);
  }

  if (!isRecord(value.airbnb)) {
    errors.push("airbnb integration state is required.");
  }

  return errors.length > 0 ? fail(errors) : ok(value as CreatePropertyInput);
}
