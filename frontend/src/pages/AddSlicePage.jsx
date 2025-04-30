import AddSliceForm from '../components/AddSliceForm';
import { Box, Typography } from '@mui/material';

export default function AddSlicePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #f8fafc, #bfdbfe)',
        px: 2,
      }}
    >
      {/* <Box textAlign="center">
      </Box> */}
        <AddSliceForm onAdd={() => window.location.reload()} />
    </Box>
  );
}
