import { jobService } from ".";
import { Job } from "../models/job.model";
import { Offer } from "../models/offer.model";
import { OFFER_STATE } from "../utils/enums";

export async function getJobId(offerId: string) {
  const offer = await Offer.findOne({ _id: offerId }, "job_id");
  return offer?.job_id;
}

export async function getReceiver(offerId: string) {
  const offer = await Offer.findOne({ _id: offerId }, "receiver");
  return offer?.receiver;
}

export async function getOffer(offerId: string) {
  const offer = await Offer.findOne({ _id: offerId }, "receiver offer_status");
  return offer;
}

export async function offerExists(offerId: string) {
  const offer = await Offer.findOne({ _id: offerId });
  return !!offer;
}

export async function isDismissed(offerId: string) {
  const offer = await Offer.findOne({ _id: offerId }, "offer_status");
  return offer?.offer_status === OFFER_STATE.Dismissed;
}

export async function makeOffer(jobId: string, requester: string) {
  const offerDate = new Date();
  const receiver = (await Job.findOne({ _id: jobId }, "requester"))?.requester;

  await Offer.create({
    job_id: jobId,
    requester: requester,
    receiver: receiver,
    offer_date: offerDate,
  });
}

export async function acceptOffer(offerId: string, executor: string) {
  const responseDate = new Date();
  const jobId = await getJobId(offerId);
  await jobService.setExecutor(jobId, executor, responseDate);

  await Offer.updateOne(
    { _id: offerId },
    {
      offer_status: OFFER_STATE.Accepted,
      response_date: responseDate,
    }
  );
}

export async function rejectOffer(offerId: string) {
  const responseDate = new Date();
  await Offer.updateOne(
    { _id: offerId },
    {
      offer_status: OFFER_STATE.Rejected,
      response_date: responseDate,
    }
  );
}
