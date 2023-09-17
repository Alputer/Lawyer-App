import { Request, Response } from "express";
import { jobService } from "../services";

export async function createJob(req: Request, res: Response) {
  try {
    const { jobDescription, dueDate } = req.body;
    const requester = res.locals.user.id;

    await jobService.createJob(requester, jobDescription, dueDate);

    return res.status(200).json({
      message: "Job is successfully created",
    });
  } catch (e: any) {
    console.error("Error creating a job", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export default {
  createJob,
};
