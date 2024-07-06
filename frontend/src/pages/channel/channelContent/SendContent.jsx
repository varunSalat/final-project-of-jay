import { Box, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const SendContent = ({ messageOnChange, message, setAttachment, onSend, onKeyDown }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setAttachment(selectedFile);
    };

    const handleIconClick = () => {
        document.getElementById("fileInput").click();
    };
    return (
        <Box
            style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => messageOnChange(event)}
                value={message || ""}
                onKeyDown={(event) => onKeyDown(event)}
            />
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <AttachFileIcon
                style={{ width: "35px", height: "35px", color: "#6c757d" }}
                onClick={handleIconClick}
            />
            <SendIcon
                style={{ width: "35px", height: "35px", color: "#2ec4b6" }}
                onClick={onSend}
            />
        </Box>
    );
};

export default SendContent;
