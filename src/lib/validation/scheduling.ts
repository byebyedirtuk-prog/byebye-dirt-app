import type { CreateScheduleInput } from "@/lib/domain/scheduling";
import {
  fail,
  isRecord,
  ok,
  requireEnum,
  requireOptionalString,
  requireString,
  type ValidationResult,
} from "@/lib/validation/schema";

const scheduleStatuses = ["available", "blocked", "assigned"] as const;
const scheduleSources = ["manual", "airbnb", "system"] as const;

export function validateSchedule(value: unknown): ValidationResult<CreateScheduleInput> {
  if (!isRecord(value)) {
    return fail(["Schedule must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireOptionalString(value, "cleanerId", errors);
  requireOptionalString(value, "propertyId", errors);
  requireOptionalString(value, "jobId", errors);
  requireEnum(value, "status", scheduleStatuses, errors);
  requireEnum(value, "source", scheduleSources, errors);
  requireOptionalString(value, "notes", errors);

  if (!value.startsAt) {
    errors.push("startsAt is required.");
  }

  if (!value.endsAt) {
    errors.push("endsAt is required.");
  }

  return errors.length > 0 ? fail(errors) : ok(value as CreateScheduleInput);
}
