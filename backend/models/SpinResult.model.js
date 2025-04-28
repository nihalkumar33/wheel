import mongoose from "mongoose";

const spinResultSchema = new mongoose.Schema(
  {
    slice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WheelSlice",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SpinResult = mongoose.model("SpinResult", spinResultSchema);

export default SpinResult;
