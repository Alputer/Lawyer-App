import mongoose from "mongoose";

const barSchema = new mongoose.Schema({
  bar_name: {
    type: String,
    required: true,
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", // Assuming you have a City model defined
    // Note: MongoDB doesn't support onUpdate and onDelete behavior directly in the schema.
    // You would need to handle these constraints in your application logic.
  },
});

export const Bar = mongoose.model("Bar", barSchema);
