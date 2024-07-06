import React, { useState } from "react";
import {
    Box,
    Button,
    FormControlLabel,
    RadioGroup,
    Switch,
    TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { useSelector } from "react-redux";

const ChannelEditForm = ({ channelDetails, userId, isAdmin, setIsRefresh }) => {
    const token = useSelector((state) => state.token);
    const [channelName, setChannelName] = useState(channelDetails.channelName);
    const [channelDescription, setChannelDescription] = useState(
        channelDetails.channelDescription
    );
    const [channelType, setChannelType] = useState(channelDetails.privateChannel);
    const [isCommunicate, setIsCommunicate] = useState(
        channelDetails.isCommunicateEveryOne
    );

    const handleUpdate = async () => {
        const newObject = JSON.stringify({
            channelName: channelName,
            channelDescription: channelDescription,
            privateChannel: channelType,
            isCommunicateEveryOne: isCommunicate,
        });
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/channel/updateChannel/${channelDetails.channelId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: newObject,
            }
        );
        await response.json();
        setIsRefresh((refresh) => !refresh);
    };

    return (
        <Box>
            <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Channel Name"
                    variant="outlined"
                    value={channelName || ""}
                    onChange={(event) => setChannelName(event.target.value)}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="outlined-basic"
                    label="Channel Description"
                    variant="outlined"
                    value={channelDescription || ""}
                    onChange={(event) => setChannelDescription(event.target.value)}
                />
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={channelType}
                    name="radio-buttons-group"
                    onChange={(event) => setChannelType(event.target.value)}
                >
                    <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Public channel"
                    />
                    <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Private channel"
                    />
                </RadioGroup>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isCommunicate}
                    name="radio-buttons-group"
                    onChange={(event) => setIsCommunicate(event.target.value)}
                >
                    <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Everyone has send the message"
                    />
                    <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Only admin can send the message"
                    />
                </RadioGroup>
            </Box>
            <Box style={{ marginTop: "1rem" }}>
                <Button
                    fullWidth
                    variant="contained"
                    style={{ textTransform: "none" }}
                    onClick={handleUpdate}
                >
                    Update Channel
                </Button>
            </Box>
        </Box>
    );
};

export default ChannelEditForm;
