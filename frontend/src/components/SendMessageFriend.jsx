import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UserImage from "./UserImage";
import { Typography, useTheme, Box } from "@mui/material"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/Socket";

export default function SendMessageFormDialog({
    setIsDisplayedForm,
    isDisplayedForm,
    friendId,
    name,
    subtitle,
    userPicturePath,
}) {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const navigate = useNavigate();
    const [content, setMessage] = React.useState(null);
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);

    const handleSendMessage = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/communication/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receipantId: friendId,
                    content: content,
                }),
            }
        );
        const data = await response.json();
        navigate("/message");
        socket.emit("sendPersonalMessage", {
            conversationId: data.communicationId,
            userId: userId,
            content: data.content,
        });
    }

    return (
        <React.Fragment>
            <Dialog
                open={isDisplayedForm}
                onClose={() => setIsDisplayedForm(false)}
                PaperProps={{
                    component: "form",
                    style: {
                        padding: "1rem",
                        width: '55rem'
                    },
                }}
            >
                <DialogTitle>
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <UserImage image={userPicturePath} size="30px" />
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                color: palette.primary.dark,
                                cursor: "pointer",
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            color={main}
                            variant="h6"
                            fontWeight="500"
                            sx={{
                                cursor: "pointer",
                                marginLeft: '2.9rem'
                            }}
                        >
                            {subtitle}
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please type your message
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="text"
                        label="write a message here..."
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        maxRows={4}
                        onChange={(event) => setMessage(event.target.value)}
                        value={content || ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDisplayedForm(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        style={{ background: "#33658a", color: "#ffff" }}
                        onClick={handleSendMessage}
                    >
                        Send Message
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
