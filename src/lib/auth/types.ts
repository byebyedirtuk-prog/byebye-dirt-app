import type { Timestamp } from "firebase/firestore";

export type UserRole = "admin" | "cleaner";

export type AppUserProfile = {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  onboardingCompleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
