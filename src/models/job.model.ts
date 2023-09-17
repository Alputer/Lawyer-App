import mongoose from "mongoose";
import { JOB_STATE } from "../utils/enums";

const jobSchema = new mongoose.Schema({
  executor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  job_status: {
    type: String,
    enum: Object.values(JOB_STATE),
    default: JOB_STATE.NotStarted,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  start_date: Date,
  due_date: Date,
  finish_date: Date,
});

export const Job = mongoose.model("Job", jobSchema);
