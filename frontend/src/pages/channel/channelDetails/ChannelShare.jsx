import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import LinkIcon from "@mui/icons-material/Link";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

const ChannelShare = ({ channelDetails, isAdmin }) => {
    const { enqueueSnackbar } = useSnackbar();
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);
    const [createLink, setCreateLink] = React.useState(false);
    const [isLoading, setisLoading] = React.useState(false);
    const [responseLink, setResponseLink] = React.useState(null);

    const copyLink = (response) => {
        navigator.clipboard.writeText(response).then(() => {
            enqueueSnackbar("Link Copied", { variant: "success" });
            setCreateLink(false);
            setResponseLink(null);
        });
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } else {
                alert("Web Share API is not supported in this browser.");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    const handleCreateLink = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/channel/createChannelLink`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    channelId: channelDetails.channelId,
                }),
            }
        );

        const data = await response.json();
        setTimeout(() => {
            setResponseLink(data);
            setisLoading(false);
        }, 2000);
    };

    return (
        <Box
            style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <Button
                variant="contained"
                onClick={handleShare}
                style={{
                    textTransform: "none",
                    background: "#05668d",
                    color: "#ffff",
                    gap: "1rem",
                }}
            >
                <ReplyIcon />
                <Typography>Forward</Typography>
            </Button>
            {isAdmin && <Button
                variant="contained"
                onClick={() => {
                    setCreateLink((preview) => !preview);
                    setisLoading(true);
                    handleCreateLink();
                }}
                style={{
                    textTransform: "none",
                    background: "#2196f3",
                    color: "#ffff",
                    gap: "1rem",
                }}
            >
                <LinkIcon />
                <Typography>Create link</Typography>
            </Button>}

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
                        {isLoading
                            ? "Creating channel link, please wait..."
                            : "Successfully created channel link please copy this link and share with person."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                        >
                            <Typography
                                onClick={() => copyLink(responseLink)}
                                style={{
                                    cursor: "pointer",
                                    width: "100%",
                                    wordBreak: "break-word",
                                }}
                            >
                                {responseLink}
                            </Typography>
                        </DialogContentText>
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
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                background: "#284b63",
                                color: "#ffff",
                                textTransform: "none",
                            }}
                            onClick={() => copyLink(responseLink)}
                            autoFocus
                        >
                            Copy link
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default ChannelShare;
