import { useEffect, useState } from 'react';
import { getAllSlices, spinWheel } from '../services/WheelService';
import { Wheel } from 'react-custom-roulette';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import WinDialog from '../components/WinDialog';


export default function SpinPage() {
  const [slices, setSlices] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [wonPrize, setWonPrize] = useState('');
  const [cooldownDialogOpen, setCooldownDialogOpen] = useState(false);
  const [nextSpinTime, setNextSpinTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [width, height] = useWindowSize();

  useEffect(() => {
    getAllSlices().then((data) => {
      const colors = ['#FFDE59', '#FFB6C1', '#87CEEB', '#90EE90', '#FFD700', '#F0A500', '#E6E6FA'];
      const wheelData = data.map((slice, index) => ({
        option: slice.text,
        style: {
          backgroundColor: colors[index % colors.length],
          textColor: 'black',
        }
      }));
      setSlices(wheelData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let timer;
    if (nextSpinTime && cooldownDialogOpen) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = new Date(nextSpinTime) - now;
        if (diff <= 0) {
          setCooldownDialogOpen(false);
          setNextSpinTime(null);
          clearInterval(timer);
        } else {
          const mins = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setTimeLeft(`${mins}m ${secs}s`);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [nextSpinTime, cooldownDialogOpen]);

  const handleSpinClick = async () => {
    try {
      const result = await spinWheel();
      const winningText = result.data.data.slice.text;
      const winningIndex = slices.findIndex(slice => slice.option === winningText);

      if (winningIndex === -1) {
        alert("Error: Winning slice not found!");
        return;
      }

      setPrizeNumber(winningIndex);
      setMustSpin(true);
    } catch (error) {
      if (
        error?.response?.status === 403 &&
        error?.response?.data?.error === "SPIN_COOLDOWN"
      ) {
        const nextTime = error.response.data.nextSpinTime;
        setNextSpinTime(new Date(nextTime));
        setCooldownDialogOpen(true);
      } else {
        console.error("Spin failed:", error);
        alert("Something went wrong during spin. Please try again.");
      }
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 10 }}>Loading Wheel...</Typography>;

  return (
    <div
      className="h-screen w-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(to bottom right, #dbeafe, #c084fc)',
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Try Your Luck!</h2>

        <div className="flex justify-center mb-6">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={slices}
            onStopSpinning={() => {
              setMustSpin(false);
              const prizeText = slices[prizeNumber].option;
              setWonPrize(prizeText);
              setDialogOpen(true);
            }}
            backgroundColors={["#FFDD00", "#FFA500"]}
            textColors={["#000000"]}
          />
        </div>

        <button
          onClick={handleSpinClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Spin Now
        </button>
      </div>

      {dialogOpen && (
        <>
          <ReactConfetti width={width} height={height} numberOfPieces={300} />
          <WinDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            winnerName={wonPrize}
          />
        </>
      )}


      <Dialog
        open={cooldownDialogOpen}
        onClose={() => setCooldownDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 3,
            backgroundColor: '#fff7f7',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.2)',
            minWidth: '300px',
            textAlign: 'center',
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc2626' }}>
          ⏳ Please wait a little longer
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mt: 1, color: '#4b5563' }}>
            You've recently spun the wheel. To keep things fair for everyone, there's a short waiting period before your next spin.
          </Typography>

          {nextSpinTime && (
            <Typography
              variant="h6"
              sx={{ mt: 3, fontWeight: 600, color: '#1f2937' }}
            >
              Time remaining: <span style={{ color: '#dc2626' }}>{timeLeft}</span>
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => setCooldownDialogOpen(false)}
            sx={{
              mt: 2,
              backgroundColor: '#ef4444',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#dc2626',
              }
            }}
          >
            Okay, got it!
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
