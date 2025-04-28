import WheelSlice from "../models/wheelslice.model.js";

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

