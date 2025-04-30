import { useState } from 'react';
import { createSlice } from "../services/WheelService";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';

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
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #f8fafc, #bfdbfe)',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: '#1e293b' }}
        >
          Add Prize Slice
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2.5}
          mt={2}
        >
          <TextField
            label="Prize Name"
            variant="outlined"
            fullWidth
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Probability (0 to 1)"
            type="number"
            variant="outlined"
            inputProps={{ step: 0.01, min: 0, max: 1 }}
            fullWidth
            value={probability}
            onChange={(e) => setProbability(e.target.value)}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Image URL (optional)"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              backgroundColor: '#111827',
              color: 'white',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1f2937',
              },
            }}
          >
            Add Slice
          </Button>

          {/* Link to view all slices */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: 'text.secondary' }}
          >
            Want to view all slices?{" "}
            <MuiLink component={Link} to="/slice-list" color="primary">
              Click here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
