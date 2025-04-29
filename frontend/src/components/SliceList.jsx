import { useEffect, useState } from 'react';
import { getAllSlices } from '../services/WheelService';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';

export default function SliceList() {
    const [slices, setSlices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSlices().then((data) => {

            console.log('Fetched slices:', data);
            setSlices(data || []);
            setLoading(false);
        });
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Grid container spacing={2}>
            {slices.map((slice) => (
                <Grid item xs={12} sm={6} key={slice._id}>
                    <Card>
                        {slice.image && slice.image.trim() !== '' && (
                            <CardMedia
                            component="img"
                            image={slice.image}
                            alt={slice.text}
                            sx={{
                              height: 160,
                              objectFit: 'cover',
                              borderBottom: '1px solid #ddd'
                            }}
                          />
                          
                        )}
                        <CardContent>
                            <Typography variant="h6">{slice.text}</Typography>
                            <Typography color="text.secondary">
                                Probability: {slice.probability}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}


