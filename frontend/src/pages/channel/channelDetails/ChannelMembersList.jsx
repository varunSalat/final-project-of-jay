import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import UserImage from "../../../components/UserImage";
import { useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

const ChannelMembersList = ({ channelDetails, userId, setIsRefresh, isLoading }) => {
  const token = useSelector((state) => state.token);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);

  useEffect(() => {
    // Generate a random background color when the component mounts
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  }, []);

  const handleRemoveMember = async (id) => {
    setMemberLoading(true)
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
    setMemberLoading(false);
  };

  const handleAddAdmin = async (id) => {
    setAdminLoading(true);
    const details = JSON.stringify({
      channelId: channelDetails.channelId,
      receipantId: id,
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/channel/addAdminChannel`,
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
    setAdminLoading(false);
  };

  const handleRemoveAdmin = async (id) => {
    setAdminLoading(true);
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
    setAdminLoading(false);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {isLoading && <Skeleton animation="wave" />}
      {channelDetails?.channelMembers.map((response) => {
        const isAdmin = channelDetails.channelAdmin.some(
          (filter) => filter._id === response._id
        );
        const yourId = response._id === userId;
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

              {isAdmin && <Chip label="Admin"
                style={{
                  // background: "#006d77",
                  background: backgroundColor,
                  color: "#ffff",
                  padding: "0.5rem",
                }} />}
            </Box>
            <Box style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  background: isAdmin ? "#ff7d00" : "#006d77",
                  color: "#ffff",
                }}
                onClick={() =>
                  isAdmin
                    ? handleRemoveAdmin(response._id)
                    : handleAddAdmin(response._id)
                }
              >
                {isAdmin
                  ? yourId
                    ? "Remove yourself from admin"
                    : "Remove from admin"
                  : "Add to admin"}
                {adminLoading && <CircularProgress />}
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
                {yourId ? "Kick out yourself" : "Kick out"}
                {memberLoading && <CircularProgress />}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChannelMembersList;
