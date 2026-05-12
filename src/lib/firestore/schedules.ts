import type {
  CreateScheduleInput,
  ScheduleDocument,
  UpdateScheduleInput,
} from "@/lib/domain/scheduling";
import { createRepository } from "@/lib/firestore/repository";
import { operationalCollections } from "@/lib/firestore/collections";
import { validateSchedule } from "@/lib/validation/scheduling";

export const schedulesRepository = createRepository<
  ScheduleDocument,
  CreateScheduleInput,
  UpdateScheduleInput
>({
  collectionName: operationalCollections.schedules,
  validateCreate: validateSchedule,
});
