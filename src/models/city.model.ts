import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
  bars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bar",
    },
  ],
});

export const City = mongoose.model("City", citySchema);
