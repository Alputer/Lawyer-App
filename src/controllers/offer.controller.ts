import { Request, Response } from "express";
import { jobService, offerService } from "../services";
import { OFFER_STATE } from "../utils/enums";

export async function makeOffer(req: Request, res: Response) {
  try {
    const { jobId } = req.body;
    const requester = res.locals.user.id;

    const jobExists = await jobService.jobExists(jobId);
    if (!jobExists) {
      return res
        .status(404)
        .json({ error: `Job with id '${jobId}' could not found` });
    }

    await offerService.makeOffer(jobId, requester);

    return res.status(200).json({
      message: "Offer is successfully created",
    });
  } catch (e: any) {
    console.error("Error making an offer", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function acceptOffer(req: Request, res: Response) {
  try {
    const { offerId } = req.body;
    const receiver = res.locals.user.id;

    const offer = await offerService.getOffer(offerId);

    if (!offer) {
      return res
        .status(404)
        .json({ error: `Offer with id '${offerId}' could not found` });
    }

    if (receiver !== offer.receiver.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to accept this offer" });
    }

    if (offer.offer_status === OFFER_STATE.Dismissed) {
      return res.status(409).json({
        error: `Offer with id '${offerId}' is already dismissed, possibly because another lawyer has already accepted the offer`,
      });
    }

    await offerService.acceptOffer(offerId, receiver);

    return res.status(200).json({
      message: "Offer is successfully accepted",
    });
  } catch (e: any) {
    console.error("Error accepting an offer", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function rejectOffer(req: Request, res: Response) {
  try {
    const { offerId } = req.body;
    const receiver = res.locals.user.id;

    const offer = await offerService.getOffer(offerId);

    if (!offer) {
      return res
        .status(404)
        .json({ error: `Offer with id '${offerId}' could not found` });
    }

    if (receiver !== offer.receiver.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to reject this offer" });
    }

    if (offer.offer_status === OFFER_STATE.Dismissed) {
      return res.status(409).json({
        error: `Offer with id '${offerId}' is already dismissed, possibly because another lawyer has already accepted the offer`,
      });
    }

    await offerService.rejectOffer(offerId, receiver);

    return res.status(200).json({
      message: "Offer is successfully rejected",
    });
  } catch (e: any) {
    console.error("Error rejecting an offer", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export default {
  makeOffer,
  acceptOffer,
  rejectOffer,
};
