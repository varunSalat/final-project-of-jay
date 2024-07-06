import React from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import ChannelCardList from "./ChannelCardList";
import CreateChannelForm from "./CreateChannelForm";
import ChannelFollowedCardList from "./ChannelFollowedCardList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChannelIndex = ({ setIsRefresh, isRefresh }) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const [createLink, setCreateLink] = React.useState(false);
    const [link, setLink] = React.useState(null);

    const handleJoinLink = async () => {
        if (link) {
            const searchParams = new URLSearchParams(new URL(link).search);
            const allId = searchParams.get('id');
            const channelId = allId.split("/")[0];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/channel/joinChannel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    channelId: channelId,
                }),
            });
            await response.json();
            setIsRefresh((preview) => !preview);
            navigate(`/channel-details/${channelId}`);
        }
    };
    return (
        <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <WidgetWrapper>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h3">Channel</Typography>
                    <Box style={{ display: "flex", gap: "1rem" }}>
                        <Button
                            style={{ textTransform: "none" }}
                            onClick={() => setOpen((preview) => !preview)}
                        >
                            Create channel
                        </Button>
                        <Button
                            variant="contained"
                            style={{ textTransform: "none" }}
                            onClick={() => setCreateLink((preview) => !preview)}
                        >
                            Join channel
                        </Button>
                    </Box>
                </Box>
                <Box style={{ marginTop: "1rem", width: "100%" }}>
                    <Typography variant="body1">
                        MindMeld: Share, explore, innovate! Join vibrant discussions, spark
                        creativity, and collaborate with fellow thinkers.
                    </Typography>
                </Box>
            </WidgetWrapper>
            {open && (
                <WidgetWrapper>
                    <Box
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h3">Create Channel</Typography>
                        </Box>
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <CreateChannelForm setIsRefresh={setIsRefresh} />
                        </Box>
                    </Box>
                </WidgetWrapper>
            )}

            <Box>
                <ChannelFollowedCardList isRefresh={isRefresh} />
            </Box>
            <Box>
                <ChannelCardList isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
            </Box>

            <Box>
                <Dialog
                    open={createLink}
                    onClose={() => setCreateLink(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        style: {
                            width: "500px",
                        },
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Join channel via link"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Paste the channel link here...
                        </DialogContentText>
                        <TextField
                            fullWidth
                            type="link"
                            id="outlined-basic"
                            label="paste the link here..."
                            variant="outlined"
                            value={link || ""}
                            onChange={(event) => setLink(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            style={{
                                background: "#f26a8d",
                                color: "#ffff",
                                textTransform: "none",
                            }}
                            onClick={() => setCreateLink(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                background: "#284b63",
                                color: "#ffff",
                                textTransform: "none",
                            }}
                            onClick={() => {
                                handleJoinLink();
                                setCreateLink(false);
                            }}
                            autoFocus
                        >
                            Join
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default ChannelIndex;
