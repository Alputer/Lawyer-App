import Job from "../models/job.model";

export async function jobExists(jobId: string): Promise<boolean> {
  const job = await Job.findOne({
    where: {
      job_id: jobId,
    },
  });
  return !!job;
}

export async function setExecutor(
  jobId: string,
  executor: string,
  responseDate: Date
): Promise<void> {
  await Job.update(
    {
      executor,
      job_status: "ongoing",
      start_date: responseDate,
    },
    {
      where: {
        job_id: jobId,
      },
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
