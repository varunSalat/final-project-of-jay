import { Box } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const SendMessageComponent = ({ onChange, value, setAttachment, onClick, onKeyDown }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setAttachment(selectedFile);
    };

    const handleIconClick = () => {
        document.getElementById("fileInput").click();
    };
    return (
        <Box style={{ height: "100%", display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
                type="text"
                style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    border: "0.5px solid gray",
                    borderRadius: "22px",
                    padding: '0.5rem',
                    outline: 'none'
                }}
                placeholder="write a message here..."
                onChange={(event) => onChange(event)}
                value={value}
                onKeyDown={(event) => onKeyDown(event)}
            />
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <AttachFileIcon style={{ cursor: 'pointer' }} onClick={handleIconClick} />
            <SendIcon onClick={onClick} />
        </Box>
    );
};

export default SendMessageComponent;
