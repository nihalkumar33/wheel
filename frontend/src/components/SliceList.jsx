import { useEffect, useState } from 'react';
import { getAllSlices, deleteSlice } from '../services/WheelService';

export default function SliceList() {
  const [slices, setSlices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSlices().then((data) => {
      console.log('Fetched slices:', data);
      setSlices(data || []);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSlice(id);
      setSlices((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Error deleting slice:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading slices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {slices.map((slice) => (
        <div
          key={slice._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
        >
          {slice.image && slice.image.trim() !== '' && (
            <img
              src={slice.image}
              alt={slice.text}
              className="w-full h-40 object-cover border-b border-gray-200"
            />
          )}
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{slice.text}</h3>
            <p className="text-gray-600">Probability: {slice.probability}</p>
            <button
              onClick={() => handleDelete(slice._id)}
              className="mt-2 self-start px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
