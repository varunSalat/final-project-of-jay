import { Box, Typography } from "@mui/material";
import React from "react";
import UserImage from "../../components/UserImage";
import moment from "moment";

const ParticipantCommunication = ({
  receipantName,
  receipantPicture,
  communicationLastDetails,
  onClick,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        marginTop: "1rem",
      }}
      onClick={onClick}
    >
      <Box style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <UserImage image={receipantPicture} size="35px" />
        <Box>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {receipantName}
          </Typography>
          {communicationLastDetails?.lastMessage ? <Typography variant="body">
            {communicationLastDetails?.lastMessage}
          </Typography> : <Typography variant="body">
            No messages...
          </Typography>}
        </Box>
      </Box>
      <Box>
        {communicationLastDetails?.lastMessageDate && <Typography>
          {moment(communicationLastDetails?.lastMessageDate).fromNow()}
        </Typography>}
      </Box>
    </Box>
  );
};

export default ParticipantCommunication;
