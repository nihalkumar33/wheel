
import { Button } from '@mui/material';

export default function SpinButton() {
  const handleSpin = () => {
    alert("🎉 Spinning the wheel!");
    // You can replace this with your actual logic later
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={handleSpin}
      sx={{ borderRadius: '50px', px: 4, py: 1.5 }}
    >
      Spin Now
    </Button>
  );
}

