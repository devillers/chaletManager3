import mongoose, { Schema } from "mongoose";

const RentalRequestSchema = new Schema(
  {
    tenant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guests: { type: Number, min: 1, default: 1 },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.RentalRequest || mongoose.model("RentalRequest", RentalRequestSchema);
