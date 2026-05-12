import type { CreateJobInput, JobDocument, UpdateJobInput } from "@/lib/domain/jobs";
import { buildJobSummary } from "@/lib/domain/jobs";
import { createRepository } from "@/lib/firestore/repository";
import { operationalCollections } from "@/lib/firestore/collections";
import { validateJob } from "@/lib/validation/jobs";

const baseJobsRepository = createRepository<JobDocument, CreateJobInput, UpdateJobInput>({
  collectionName: operationalCollections.jobs,
  validateCreate: validateJob,
});

export const jobsRepository = {
  ...baseJobsRepository,
  create(input: CreateJobInput) {
    return baseJobsRepository.create({
      ...input,
      summary: input.summary ?? buildJobSummary(input.services),
    });
  },
  upsert(input: CreateJobInput) {
    return baseJobsRepository.upsert({
      ...input,
      summary: input.summary ?? buildJobSummary(input.services),
    });
  },
};
