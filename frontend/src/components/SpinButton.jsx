import { useState } from 'react';
import { spinWheel } from "../services/WheelService.js"

export default function SpinButton() {
  const [result, setResult] = useState(null);

  const handleSpin = async () => {
    const res = await spinWheel();
    console.log(res.data);
    setResult(res.data.data);
  };

  return (
    <div>
      <button onClick={handleSpin}>Spin Wheel</button>
      {result && <p>🎉 You got: {result.text}</p>}
    </div>
  );
}
