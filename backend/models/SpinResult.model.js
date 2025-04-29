import mongoose from "mongoose";

const spinResultSchema = new mongoose.Schema(
  {
    slice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WheelSlice",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const SpinResult = mongoose.model("SpinResult", spinResultSchema);

export default SpinResult;
