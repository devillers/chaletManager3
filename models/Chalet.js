import mongoose, { Schema } from "mongoose";

const PhotoSchema = new Schema(
  {
    url: { type: String, required: true },
    roomName: { type: String },
    roomDescription: { type: String },
    isHero: { type: Boolean, default: false },
  },
  { _id: false }
);

const ChaletSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    fiscalAddress: { type: String },
    registrationNumber: { type: String },
    descriptionShort: { type: String },
    descriptionLong: { type: String },
    photos: [PhotoSchema],
    icalUrl: { type: String },
    status: {
      type: String,
      enum: ["draft", "pending", "published"],
      default: "draft",
    },
    contractAcceptedAt: { type: Date },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Chalet || mongoose.model("Chalet", ChaletSchema);
