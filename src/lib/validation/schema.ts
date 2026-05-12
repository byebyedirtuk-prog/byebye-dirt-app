export type ValidationResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      errors: string[];
    };

export type Validator<T> = (value: unknown) => ValidationResult<T>;

export function ok<T>(data: T): ValidationResult<T> {
  return { ok: true, data };
}

export function fail<T = never>(errors: string[]): ValidationResult<T> {
  return { ok: false, errors };
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function requireString(value: Record<string, unknown>, field: string, errors: string[]) {
  if (typeof value[field] !== "string" || value[field] === "") {
    errors.push(`${field} is required.`);
  }
}

export function requireOptionalString(
  value: Record<string, unknown>,
  field: string,
  errors: string[],
) {
  if (value[field] !== null && value[field] !== undefined && typeof value[field] !== "string") {
    errors.push(`${field} must be a string or null.`);
  }
}

export function requireBoolean(value: Record<string, unknown>, field: string, errors: string[]) {
  if (typeof value[field] !== "boolean") {
    errors.push(`${field} must be true or false.`);
  }
}

export function requireNumber(value: Record<string, unknown>, field: string, errors: string[]) {
  if (typeof value[field] !== "number" || Number.isNaN(value[field])) {
    errors.push(`${field} must be a number.`);
  }
}

export function requireEnum<T extends string>(
  value: Record<string, unknown>,
  field: string,
  allowedValues: readonly T[],
  errors: string[],
) {
  if (!allowedValues.includes(value[field] as T)) {
    errors.push(`${field} must be one of: ${allowedValues.join(", ")}.`);
  }
}

export function requireArray(value: Record<string, unknown>, field: string, errors: string[]) {
  if (!Array.isArray(value[field])) {
    errors.push(`${field} must be an array.`);
  }
}
