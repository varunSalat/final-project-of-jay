import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../../navbar";
import WidgetWrapper from "../../../components/WidgetWrapper";
import ChannelList from "./ChannelList";
import { useSelector } from "react-redux";
import ChannelContent from "./ChannelContent";
import { AiFillMessage } from "react-icons/ai";


const ChannelContentIndex = () => {
  const [followedChannelList, setFollowedChannelList] = React.useState();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const [channel, setChannel] = React.useState(null);
  const [isRefresh, setIsRefresh] = React.useState(false);

  const getFollowedChannelList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/channel/getConentListChannel`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setFollowedChannelList(data);
  };

  useEffect(() => {
    getFollowedChannelList();
  }, [isRefresh]);

  const handleOpenChannel = (channel) => {
    setChannel(channel);
    setIsRefresh((prev) => !prev);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "1rem", height: '100vh' }}>
      <Navbar />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          height: "89vh",
        }}
      >
        {(isNonMobileScreens || !channel) && <WidgetWrapper style={{ flex: "1 10%", height: "100%" }}>
          <ChannelList
            followedChannelList={followedChannelList}
            onClick={(channel) => handleOpenChannel(channel)}
          />
        </WidgetWrapper>}

        {(channel || isNonMobileScreens) && <WidgetWrapper style={{ flex: "1 50%", height: "100%" }}>
          {channel ? (
            <ChannelContent
              channel={channel}
              userId={userId}
              token={token}
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
            />
          ) : (
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <AiFillMessage size={80} />
                <Typography variant="h5">Welcome to Verma Channel Communittee</Typography>
                <Typography color="text.secondary">
                  In this channel, feel free to privately message other users on Verma. It's a great way to have one-on-one conversations without the whole group seeing.
                </Typography>
              </Box>
            </Box>
          )}
        </WidgetWrapper>}
      </Box>
    </Box>
  );
};

export default ChannelContentIndex;
