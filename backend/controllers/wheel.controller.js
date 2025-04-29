import WheelSlice from "../models/wheelslice.model.js";
import SpinResult from "../models/SpinResult.model.js";
import User from '../models/User.model.js';


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
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const now = new Date();

    if (user.nextSpinTime && user.nextSpinTime > now) {
      const timeLeft = user.nextSpinTime - now;
      return res.status(403).json({
        success: false,
        message: "Spin not allowed yet",
        timeLeft, // ms remaining
        nextSpinTime: user.nextSpinTime,
      });
    }

    const slices = await WheelSlice.find();

    // Build an array of weighted slices
    const weightedSlices = [];

    slices.forEach(slice => {
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

    const idSelectedSlice = selectedSlice._id.toString();

    // Save spin result
    const spinResult = new SpinResult({ slice: idSelectedSlice, user: user._id });
    await spinResult.save();

    // Set next allowed spin time (e.g., 24h later)
    user.nextSpinTime = new Date(now.getTime() + 1 * 60 * 1000); // or 1 min for testing
    await user.save();

    res.status(200).json({
      success: true,
      data: selectedSlice,
      nextSpinTime: user.nextSpinTime,
    });

  } catch (error) {
    console.error("Error spinning wheel:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
