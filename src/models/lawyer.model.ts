import mongoose from "mongoose";
import { LAWYER_STATE, SORT_OPTIONS } from "../utils/enums";

const lawyerProfileSchema = new mongoose.Schema({
  linkedin_url: {
    type: String,
    default: "N/A",
  },
  age: {
    type: Number,
    default: -1,
  },
  phone_number: {
    type: String,
    default: "N/A",
  },
});

const ratingInfoSchema = new mongoose.Schema({
  average_rating: {
    type: Number,
  },
  total_number_of_votes: {
    type: Number,
  },
});

const lawyerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    bar_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bar",
      required: true,
    },
    lawyer_state: {
      type: String,
      enum: Object.values(LAWYER_STATE),
      required: true,
      default: LAWYER_STATE.FREE,
    },
    is_validated: {
      type: Boolean,
      required: true,
      default: false,
    },
    last_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    verification_code: String,
    reset_token: String,
    rating_info: {
      type: ratingInfoSchema,
      default: { average_rating: 0, total_number_of_votes: 0 },
    },
    lawyer_profile: lawyerProfileSchema,
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface GetLawyersOptions {
  barId: string;
  lawyer_state: LAWYER_STATE | undefined;
  minRating: number;
  maxRating: number;
  sort: SORT_OPTIONS;
  page: number;
  pageSize: number;
}

export interface BasicLawyer {
  email: String;
  firstname: String;
  lastname: String;
  bar_id: number;
  lawyer_state: LAWYER_STATE;
  average_rating: number;
}

export interface RatingInfo {
  average_rating: number;
  total_number_of_votes: number;
}

export const Lawyer = mongoose.model("Lawyer", lawyerSchema);
