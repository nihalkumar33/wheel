import { useEffect, useState, useRef } from 'react';
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
import { motion } from 'framer-motion';
import { useWindowSize } from '@react-hook/window-size';
import WinDialog from '../components/WinDialog';
import confetti from 'canvas-confetti';
import '../styles/spin-theme.css';

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
  const [spinning, setSpinning] = useState(false);

  const wheelRef = useRef(null);

  useEffect(() => {
    getAllSlices().then((data) => {
      const colors = ['#FFD700', '#000000'];
      const wheelData = data.map((slice, index) => ({
        option: slice.text,
        style: {
          backgroundColor: colors[index % 2],
          textColor: '#FFF700',
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
      setSpinning(true);
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

  const handleSpinEnd = () => {
    setMustSpin(false);
    setSpinning(false);
    const prizeText = slices[prizeNumber].option;
    setWonPrize(prizeText);
    setDialogOpen(true);
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
  };

  if (loading) return <Typography align="center" sx={{ mt: 10, fontFamily: 'Poppins, sans-serif' }}>Loading Wheel...</Typography>;

  return (
    <div
      className="h-screen w-screen flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(circle at center, #facc15 0%, #b45309 40%, #000000 100%)',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 p-8 rounded-3xl shadow-[0_0_60px_rgba(255,215,0,0.4)] w-full max-w-md text-center border-[3px] border-yellow-500"
      >
        <h2 className="text-3xl font-black text-yellow-300 mb-6 tracking-widest royal-heading" style={{ letterSpacing: '1px' }}>
          Spin & Win!
        </h2>

        <div className="flex justify-center mb-6">
          <div className={`wheel3d ${spinning ? 'spin-animation' : ''}`} style={{ transition: 'transform 4s ease-out' }}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={slices}
              onStopSpinning={handleSpinEnd}
              backgroundColors={["#FFD700", "#000000"]}
              textColors={["#FFF700"]}
              outerBorderColor={"#FFD700"}
              outerBorderWidth={10}
              innerRadius={10}
              radiusLineColor="#FFD700"
              radiusLineWidth={2}
            />
          </div>
        </div>

        <button
          onClick={handleSpinClick}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 rounded-xl transition button-glow"
          style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '1px' }}
        >
          Spin Now
        </button>
      </motion.div>

      <WinDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        winnerName={wonPrize}
        winnerNameStyle={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'gold', textShadow: '0 0 10px gold', letterSpacing: '1px' }}
      />

      <Dialog
        open={cooldownDialogOpen}
        onClose={() => setCooldownDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 3,
            backgroundColor: '#111827',
            border: '2px solid #FFD700',
            boxShadow: '0px 8px 32px rgba(255,215,0,0.2)',
            minWidth: '300px',
            textAlign: 'center',
            fontFamily: 'Poppins, sans-serif',
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FFD700', fontFamily: 'Playfair Display, serif' }}>
          ⏳ Hold on!
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mt: 1, color: '#e5e7eb', fontFamily: 'Poppins, sans-serif' }}>
            You’ve spun recently. Please wait a bit before trying again!
          </Typography>
          {nextSpinTime && (
            <Typography
              variant="h6"
              sx={{ mt: 3, fontWeight: 600, color: '#F87171', fontFamily: 'Poppins, sans-serif' }}
            >
              Time remaining: <span>{timeLeft}</span>
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => setCooldownDialogOpen(false)}
            sx={{
              mt: 2,
              backgroundColor: '#facc15',
              color: '#000',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              letterSpacing: '1px',
              fontFamily: 'Poppins, sans-serif',
              '&:hover': {
                backgroundColor: '#eab308',
              }
            }}
          >
            Okay!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
