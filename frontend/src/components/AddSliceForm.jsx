// AddSliceForm.jsx
import { useState } from 'react';
import { createSlice } from "../services/WheelService";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

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

    await createSlice({
      text: label,
      probability: Number(probability),
      image: imageUrl,
    });

    setLabel('');
    setProbability('');
    setImageUrl('');
    onAdd();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom align="center">
        Add Prize Slice
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Prize Name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
        <TextField
          label="Probability (0 to 1)"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 1 }}
          value={probability}
          onChange={(e) => setProbability(e.target.value)}
          required
        />
        <TextField
          label="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth>
          Add Slice
        </Button>
      </Box>
    </Paper>
  );
}
