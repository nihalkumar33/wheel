import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Slide,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const WinDialog = ({ open, onClose, winnerName }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                style: {
                    borderRadius: 20,
                    padding: 20,
                    background: "white",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                },
            }}
        >
            <DialogTitle
                sx={{ textAlign: "center", pb: 0, fontWeight: "bold", fontSize: "1.8rem" }}
            >
                <CelebrationIcon
                    color="success"
                    sx={{ fontSize: 40, mr: 1, verticalAlign: "middle" }}
                />
                You Won!
            </DialogTitle>

            <DialogContent sx={{ textAlign: "center" }}>
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <CheckCircleOutlineIcon sx={{ color: "#4caf50", fontSize: 60, mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ textTransform: "capitalize" }}>
                        {winnerName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Congratulations on your lucky spin!
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{
                        borderRadius: "30px",
                        px: 4,
                        py: 1,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1rem",
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WinDialog;
