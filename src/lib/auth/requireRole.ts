import type { AppUserProfile, UserRole } from "@/lib/auth/types";
import { requireAuth } from "@/lib/auth/requireAuth";

export class RoleRequiredError extends Error {
  constructor(role: UserRole) {
    super(`The ${role} role is required.`);
    this.name = "RoleRequiredError";
  }
}

export async function requireRole(profile: AppUserProfile | null, role: UserRole) {
  await requireAuth();

  if (profile?.role !== role) {
    throw new RoleRequiredError(role);
  }

  return profile;
}
