import { useEffect, useState } from 'react';
import { getAllSlices, spinWheel } from '../services/WheelService';
import { Wheel } from 'react-custom-roulette';
import { Button, Container, Typography, Box } from '@mui/material';

export default function SpinPage() {
  const [slices, setSlices] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSlices().then((data) => {
      const wheelData = data.map((slice) => ({
        option: slice.text, // text to display
        style: { backgroundColor: getRandomColor() } // optional random color
      }));
      setSlices(wheelData);
      setLoading(false);
    });
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSpinClick = async () => {
    try {
      const result = await spinWheel(); // backend call
      const winningText = result.data.data.text; // correctly extract prize name
      console.log("Backend response:", result.data.data);
      
      const winningIndex = slices.findIndex(slice => slice.option === winningText);
      console.log("Text:", result.data.data.text);

      if (winningIndex === -1) {
        alert("Error: Winning slice not found!");
        return;
      }

      setPrizeNumber(winningIndex);
      setMustSpin(true);
    } catch (error) {
      console.error("Spin failed:", error);
      alert("Something went wrong during spin. Please try again.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        🎡 Spin the Wheel
      </Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={slices}
          onStopSpinning={() => {
            setMustSpin(false);
            alert(`🎉 You won: ${slices[prizeNumber].option}!`);
          }}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
        />
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSpinClick}
          size="large"
        >
          Spin Now
        </Button>
      </Box>
    </Container>
  );
}
