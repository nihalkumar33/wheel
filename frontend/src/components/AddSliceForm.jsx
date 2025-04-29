import { useState } from 'react';
import { createSlice } from "../services/WheelService.js"

export default function AddSliceForm({ onAdd }) {
  const [label, setLabel] = useState('');
  const [probability, setProbability] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!label || !probability) {
      alert("Please fill all required fields!");
      return;
    }

    const res = await createSlice({
      text: label,  // backend expects 'text'
      probability: Number(probability),  // ensure it's a number
      image: imageUrl,  // optional, you can leave blank
    });

    setLabel('');
    setProbability('');
    setImageUrl('');
    onAdd(); // Refresh list
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px' }}>
      <input
        value={label}
        onChange={e => setLabel(e.target.value)}
        placeholder="Slice label"
        required
      />
      <input
        type="number"
        value={probability}
        onChange={e => setProbability(e.target.value)}
        placeholder="Probability (0 to 1)"
        step="0.01"
        min="0"
        max="1"
        required
      />
      <input
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
      />
      <button type="submit">Add Slice</button>
    </form>
  );
}
