import { Box, Typography } from "@mui/material";
import React from "react";
import UserImage from "../../components/UserImage";
import moment from "moment";

const MessageCardComponent = ({ message, receiptantDetails, loggedInUser }) => {

  return (
    <Box style={{ width: "100%" }}>
      {message?.senderId !== loggedInUser._id && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <Box style={{ maxWidth: "50%" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: "1rem",
              }}
            >
              <UserImage image={receiptantDetails.picturePath} size="35px" />
              <Box
                style={{
                  background: "#f6fff8",
                  padding: "1rem",
                  borderRadius: "25px 25px 25px 0",
                }}
              >
                <Typography>{message.content}</Typography>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: "1rem",
              }}
            >
              <Typography>{moment(message.timeStamp).fromNow()}</Typography>
            </Box>
          </Box>
        </Box>
      )}

      {message?.senderId === loggedInUser._id && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <Box style={{ maxWidth: "50%", marginRight: "1.5rem" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: "1rem",
              }}
            >
              <Box
                style={{
                  background: "#f6fff8",
                  padding: "1rem",
                  borderRadius: "25px 25px 0 25px",
                }}
              >
                <Typography>{message.content}</Typography>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <Typography>{moment(message.timeStamp).fromNow()}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MessageCardComponent;
