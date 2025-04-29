import { useEffect, useState } from 'react';
import { getAllSlices, deleteSlice } from "../services/WheelService.js"
export default function SliceList() {
  const [slices, setSlices] = useState([]);

  const loadSlices = async () => {
    const res = await getAllSlices();
    console.log(res.data);
    setSlices(res.data.data);
  };

  const handleDelete = async (id) => {
    await deleteSlice(id);
    loadSlices();
  };

  useEffect(() => {
    loadSlices();
  }, []);

  return (
    <ul>
      {slices.map(slice => (
        <li key={slice._id}>
          {slice.label} <button onClick={() => handleDelete(slice._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
