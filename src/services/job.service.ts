import { Job } from "../models/job.model";
import { JOB_STATE } from "../utils/enums";

export async function jobExists(jobId: string): Promise<boolean> {
  const job = await Job.findOne({
    _id: jobId,
  });
  return !!job;
}

export async function setExecutor(
  jobId: string,
  executor: string,
  responseDate: Date
): Promise<void> {
  await Job.updateOne(
    {
      _id: jobId,
    },
    {
      executor: executor,
      job_status: JOB_STATE.Ongoing,
      start_date: responseDate,
    }
  );
}

export async function createJob(
  requester: string,
  jobDescription: string,
  dueDate: Date
): Promise<void> {
  const createDate = new Date();
  await Job.create({
    requester: requester,
    job_description: jobDescription,
    create_date: createDate,
    due_date: dueDate,
  });
}
