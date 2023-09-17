import mongoose from "mongoose";
import { OFFER_STATE } from "../utils/enums";

const offerSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Job",
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  offer_status: {
    type: String,
    enum: Object.values(OFFER_STATE),
    default: OFFER_STATE.Pending,
    required: true,
  },
  offer_date: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  response_date: Date,
  dismiss_date: Date,
});

export const Offer = mongoose.model("Offer", offerSchema);
