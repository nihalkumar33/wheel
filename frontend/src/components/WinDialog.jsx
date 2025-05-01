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
                    background: "radial-gradient(circle, #2c1b00, #000)",
                    boxShadow: "0 0 20px gold",
                    border: "2px solid gold",
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    pb: 0,
                    fontWeight: "bold",
                    fontSize: "2rem",
                    color: "gold",
                    textShadow: "0 0 10px gold",
                }}
            >
                <CelebrationIcon
                    sx={{
                        fontSize: 50,
                        mb: "-5px",
                        mr: 1,
                        color: "gold",
                        textShadow: "0 0 10px gold",
                    }}
                />
                You Won!
            </DialogTitle>

            <DialogContent sx={{ textAlign: "center", color: "white" }}>
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <CheckCircleOutlineIcon sx={{ color: "limegreen", fontSize: 70, mb: 1 }} />
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            textTransform: "capitalize",
                            color: "gold",
                            textShadow: "0 0 10px gold",
                        }}
                    >
                        {winnerName}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Congratulations on your lucky spin!
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        borderRadius: "30px",
                        px: 4,
                        py: 1,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        background: "gold",
                        color: "#000",
                        boxShadow: "0 0 10px gold",
                        "&:hover": {
                            background: "#ffcc00",
                        },
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WinDialog;
