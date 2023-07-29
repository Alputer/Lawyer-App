import { jobService } from ".";
import { query } from "../utils/db";

const { v4: uuidv4 } = require('uuid');

export async function getJobId(offerId: string){
    const queryResult = await query("SELECT job_id FROM Offers WHERE offer_id = $1", [offerId]);
    return queryResult.rows[0].job_id;
  }

export async function offerExists(offerId: string){
    const queryResult = await query("SELECT * FROM Offers WHERE offer_id = $1", [offerId]);
    return queryResult.rowCount > 0
  }

  export async function isDismissed(offerId: string){
    const queryResult = await query("SELECT offer_status FROM Offers WHERE offer_id = $1", [offerId]);
    return queryResult.rows[0].offer_status === 'dismissed';
  }

export async function makeOffer(jobId: string, requester: string) {
    const offerId = uuidv4();
    const offerDate = new Date();
    const receiver = (await query('SELECT requester FROM Jobs WHERE job_id = $1', [jobId])).rows[0].requester;
    
    await query('INSERT INTO Offers (offer_id, job_id, requester, receiver, offer_date) VALUES ($1, $2, $3, $4, $5)', [offerId, jobId, requester, receiver, offerDate]);
    return;
  }

  export async function acceptOffer(offerId: string, executor: string) {
    const responseDate = new Date();
    const jobId = await getJobId(offerId);
    await jobService.setExecutor(jobId, executor, responseDate);
    await query("UPDATE Offers SET offer_status = 'accepted', response_date = $1 WHERE offer_id = $2", [responseDate, offerId]);
    return;
  }