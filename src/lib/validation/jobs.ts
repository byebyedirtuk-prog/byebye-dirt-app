import type { CreateJobInput } from "@/lib/domain/jobs";
import {
  fail,
  isRecord,
  ok,
  requireArray,
  requireEnum,
  requireNumber,
  requireOptionalString,
  requireString,
  type ValidationResult,
} from "@/lib/validation/schema";

const jobStatuses = ["draft", "scheduled", "in_progress", "completed", "cancelled"] as const;
const jobSources = ["manual", "airbnb"] as const;

export function validateJob(value: unknown): ValidationResult<CreateJobInput> {
  if (!isRecord(value)) {
    return fail(["Job must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireEnum(value, "source", jobSources, errors);
  requireOptionalString(value, "externalBookingId", errors);
  requireOptionalString(value, "clientId", errors);
  requireString(value, "clientNameSnapshot", errors);
  requireString(value, "propertyId", errors);
  requireString(value, "propertyNameSnapshot", errors);
  requireOptionalString(value, "assignedCleanerId", errors);
  requireOptionalString(value, "assignedCleanerUid", errors);
  requireString(value, "assignedCleanerNameSnapshot", errors);
  requireEnum(value, "status", jobStatuses, errors);
  requireArray(value, "services", errors);
  requireNumber(value, "customerPrice", errors);
  requireNumber(value, "cleanerPay", errors);
  requireNumber(value, "bonus", errors);
  requireNumber(value, "tip", errors);
  requireEnum(value, "currency", ["GBP"], errors);
  requireOptionalString(value, "notes", errors);
  requireString(value, "createdByUid", errors);

  if (Array.isArray(value.services) && value.services.length === 0) {
    errors.push("services must include at least one service.");
  }

  if (!isRecord(value.propertyAddressSnapshot)) {
    errors.push("propertyAddressSnapshot is required.");
  }

  return errors.length > 0 ? fail(errors) : ok(value as CreateJobInput);
}
