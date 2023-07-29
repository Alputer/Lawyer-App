import { query } from "../utils/db";

const { v4: uuidv4 } = require('uuid');

export async function makeOffer(jobId: string, requester: string) {
    const offerId = uuidv4();
    const offerDate = new Date();
    const receiver = (await query('SELECT requester FROM Jobs WHERE job_id = $1', [jobId])).rows[0].requester;
    console.log(receiver);
    await query('INSERT INTO Offers (offer_id, job_id, requester, receiver, offer_date) VALUES ($1, $2, $3, $4, $5)', [offerId, jobId, requester, receiver, offerDate]);
    return;
  }