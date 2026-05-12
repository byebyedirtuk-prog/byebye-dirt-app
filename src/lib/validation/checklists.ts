import type { CreateChecklistInput } from "@/lib/domain/checklists";
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

const checklistStatuses = ["not_started", "in_progress", "completed"] as const;

export function validateChecklist(value: unknown): ValidationResult<CreateChecklistInput> {
  if (!isRecord(value)) {
    return fail(["Checklist must be an object."]);
  }

  const errors: string[] = [];
  requireString(value, "id", errors);
  requireOptionalString(value, "jobId", errors);
  requireOptionalString(value, "propertyId", errors);
  requireOptionalString(value, "cleanerId", errors);
  requireString(value, "templateKey", errors);
  requireOptionalString(value, "serviceId", errors);
  requireOptionalString(value, "serviceNameSnapshot", errors);
  requireEnum(value, "status", checklistStatuses, errors);
  requireArray(value, "items", errors);
  requireOptionalString(value, "completedAt", errors);

  return errors.length > 0 ? fail(errors) : ok(value as CreateChecklistInput);
}
