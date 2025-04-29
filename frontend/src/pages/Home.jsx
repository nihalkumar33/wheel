import React, { useEffect, useState } from 'react';
import { getAllSlices } from "../services/WheelService.js"
import WheelCard from '../components/WheelCard';

const Home = () => {
    const [slices, setSlices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSlices()
            .then((res) => {
                if (res.data.success) {
                    setSlices(res.data.data);
                    console.log("I am here")
                    console.log(res.data);
                }
            })
            .catch((err) => console.error('Error fetching slices:', err))
            .finally(
                () => setLoading(false)
            );
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-black">Wheel Slices</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {slices.map((slice) => (
                        <WheelCard key={slice._id} slice={slice} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
