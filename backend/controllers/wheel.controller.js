import WheelSlice from "../models/wheelslice.model.js";
import SpinResult from "../models/SpinResult.model.js";

export const createSlice = async (req, res) => {
  try {
    const { text, image, probability } = req.body;
    // const newSlice = new WheelSlice({ text, image, probability });

    const newSlice = await WheelSlice.create({
      text,
      image,
      probability,
    });

    console.log('New slice created:', newSlice);

    // await newSlice.save();

    res.status(201).json({
      success: true,
      message: 'Slice created successfully',
      data: newSlice,
    });

  } catch (error) {
    console.error('Error creating slice:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getAllSlice = async (req, res) => {
  try {
    const slices = await WheelSlice.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: slices.length,
      data: slices,
    });

  } catch (error) {
    console.error('Error fetching slices:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteSlice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlice = await WheelSlice.findByIdAndDelete(id);

    if (!deletedSlice) {
      return res.status(404).json({ success: false, message: 'Slice not found' });
    }

    res.status(200).json({ success: true, message: 'Slice deleted successfully' });
  } catch (error) {
    console.error('Error deleting slice:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const spinWheel = async (req, res) => {
  try {
    const slices = await WheelSlice.find();

    // Build an array of weighted slices
    const weightedSlices = [];

    slices.forEach(slice => {
      // Push the slice multiple times based on its probability
      const count = Math.floor(slice.probability * 100);

      for (let i = 0; i < count; i++) {
        weightedSlices.push(slice);
      }
    });

    if (weightedSlices.length === 0) {
      return res.status(404).json({ success: false, message: "No slices available to spin" });
    }

    // Pick a random slice
    const randomIndex = Math.floor(Math.random() * weightedSlices.length);
    const selectedSlice = weightedSlices[randomIndex];

    const idSelectedSlice = selectedSlice._id.toString(); // Convert ObjectId to string

    // Save the result to the database
    const spinResult = new SpinResult({ slice: idSelectedSlice });
    await spinResult.save();

    console.log("array: ", weightedSlices);

    res.status(200).json({
      success: true,
      data: selectedSlice,
    });

  } catch (error) {
    console.error("Error spinning wheel:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


