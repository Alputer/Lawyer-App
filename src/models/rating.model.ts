import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rater_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },
    rated_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
ratingSchema.index({ rater_id: 1, rated_id: 1 }, { unique: true });
export const Rating = mongoose.model("Rating", ratingSchema);
