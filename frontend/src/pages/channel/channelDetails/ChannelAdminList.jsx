import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import UserImage from "../../../components/UserImage";
import { useSelector } from "react-redux";

const ChannelAdminList = ({ channelDetails, userId, setIsRefresh }) => {
  const token = useSelector((state) => state.token);
  const handleRemoveAdmin = async (id) => {
    const details = JSON.stringify({
      channelId: channelDetails.channelId,
      receipantId: id,
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/channel/removeAdminChannel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: details,
      }
    );
    await response.json();
    setIsRefresh((refresh) => !refresh);
  };
  const handleRemoveMember = async (id) => {
    const details = JSON.stringify({
      channelId: channelDetails.channelId,
      receipantId: id,
    });
    const adminResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/channel/removeAdminChannel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: details,
      }
    );
    const response = await fetch(`${process.env.REACT_APP_API_URL}/channel/removeMember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: details,
    });
    await adminResponse.json();
    await response.json();
    setIsRefresh((refresh) => !refresh);
  };
  return (
    <Box>
      {channelDetails?.channelAdmin.map((response) => {
        return (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <UserImage image={response?.picturePath} size="40px" />
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {`${response?.firstName} ${response?.lastName}`}
              </Typography>
              {response._id === userId && (
                <Chip
                  label="You"
                  style={{
                    background: "#006d77",
                    color: "#ffff",
                    padding: "0.5rem",
                  }}
                />
              )}
            </Box>
            <Box style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  background: "#ff7d00",
                  color: "#ffff",
                }}
                onClick={() => handleRemoveAdmin(response._id)}
              >
                Remove from admin
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  background: "#d62828",
                  color: "#ffff",
                }}
                onClick={() => handleRemoveMember(response._id)}
              >
                Kick out
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChannelAdminList;
