import { query } from "../utils/db";

const { v4: uuidv4 } = require('uuid');

export async function jobExists(jobId: string){
  const queryResult = await query("SELECT * FROM Jobs WHERE job_id = $1", [jobId]);
  return queryResult.rowCount > 0
}

export async function createJob( requester: string, jobDescription: string, dueDate: Date) {
    const jobId = uuidv4();
    const createDate = new Date();
    await query('INSERT INTO Jobs (job_id, requester, job_description, create_date, due_date) VALUES ($1, $2, $3, $4, $5)', [jobId, requester, jobDescription, createDate, dueDate?.toString()]);
    return;
  }