import mongoose from "mongoose";

const GoogleAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GoogleAccount", GoogleAccountSchema);
