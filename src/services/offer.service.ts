import { jobService } from ".";
import Job from "../models/job.model";
import Offer from "../models/offer.model";

export async function getJobId(offerId: string) {
  const offer = await Offer.findOne({
    where: { offer_id: offerId },
    attributes: ["job_id"],
  });
  return offer?.job_id;
}

export async function getReceiver(offerId: string) {
  const offer = await Offer.findOne({
    where: { offer_id: offerId },
    attributes: ["receiver"],
  });
  return offer?.receiver;
}

export async function getOffer(offerId: string) {
  const offer = await Offer.findOne({
    where: { offer_id: offerId },
    attributes: ["receiver", "offer_status"],
  });
  return offer;
}

export async function offerExists(offerId: string) {
  const count = await Offer.count({ where: { offer_id: offerId } });
  return count > 0;
}

export async function isDismissed(offerId: string) {
  const offer = await Offer.findOne({
    where: { offer_id: offerId },
    attributes: ["offer_status"],
  });
  return offer?.offer_status === "dismissed";
}

export async function makeOffer(jobId: string, requester: string) {
  const offerDate = new Date();
  const receiver = (
    await Job.findOne({
      where: { job_id: jobId },
      attributes: ["requester"],
    })
  )?.requester;

  await Offer.create({
    job_id: jobId,
    requester: requester,
    receiver: receiver,
    offer_date: offerDate,
    offer_status: "pending",
  });
}

export async function acceptOffer(offerId: string, executor: string) {
  const responseDate = new Date();
  const jobId = await getJobId(offerId);
  await jobService.setExecutor(jobId, executor, responseDate);

  await Offer.update(
    {
      offer_status: "accepted",
      response_date: responseDate,
    },
    {
      where: { offer_id: offerId },
    }
  );
}

export async function rejectOffer(offerId: string) {
  const responseDate = new Date();
  await Offer.update(
    {
      offer_status: "rejected",
      response_date: responseDate,
    },
    {
      where: { offer_id: offerId },
    }
  );
}
