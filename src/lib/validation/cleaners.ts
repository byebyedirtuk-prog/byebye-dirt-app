import type { CreateCleanerInput } from "@/lib/domain/cleaners";
import {
  fail,
  isRecord,
  ok,
  requireBoolean,
  requireEnum,
  requireNumber,
  requireOptionalString,
  requireString,
  type ValidationResult,
} from "@/lib/validation/schema";

const paymentTypes = ["hourly", "fixed", "not_specified"] as const;

export function validateCleaner(value: unknown): ValidationResult<CreateCleanerInput> {
  if (!isRecord(value)) {
    return fail(["Cleaner must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireBoolean(value, "active", errors);
  requireOptionalString(value, "userUid", errors);
  requireString(value, "fullName", errors);
  requireOptionalString(value, "phone", errors);
  requireOptionalString(value, "email", errors);
  requireEnum(value, "paymentType", paymentTypes, errors);
  requireOptionalString(value, "serviceArea", errors);
  requireOptionalString(value, "notes", errors);

  if (value.hourlyRate !== null && value.hourlyRate !== undefined) {
    requireNumber(value, "hourlyRate", errors);
  }

  return errors.length > 0 ? fail(errors) : ok(value as CreateCleanerInput);
}
