import mongoose from "mongoose"

const wheelSliceSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            default: '',
        },
        probability: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        },
    },
    {
        timestamps: true
    }
)

const WheelSlice = mongoose.model("WheelSlice", wheelSliceSchema)
export default WheelSlice;


