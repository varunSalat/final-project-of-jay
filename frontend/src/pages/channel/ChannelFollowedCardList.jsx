import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import logo1 from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";

const ChannelFollowedCardList = ({ isDisplay, isRefresh }) => {
    const navigate = useNavigate();
    const [channelList, setChannelList] = useState([]);
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);

    const getChannelList = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/channel/getFollowedChannel`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        setChannelList(data);
    };

    useEffect(() => {
        getChannelList();
    }, [isRefresh]);

    return (
        <>
            {channelList?.length > 0 && <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginTop: !isDisplay ? "1rem" : "none",
                }}
            >
                {!isDisplay && (
                    <WidgetWrapper>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Followed Channels
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            MindMeld: Share, explore, innovate! Join vibrant discussions, spark
                            creativity, and collaborate with fellow thinkers.
                        </Typography>
                    </WidgetWrapper>
                )}
                <WidgetWrapper>
                    <Box
                        style={{
                            display: "flex",
                            gap: "1rem",
                            width: "100%",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            justifyContent: "start",
                        }}
                    >
                        {channelList &&
                            channelList
                                ?.slice()
                                ?.reverse()
                                ?.map((channel) => {
                                    return (
                                        <Box
                                            style={{
                                                width: "180px",
                                                height: "150px",
                                                flex: "1 1 30%",
                                            }}
                                        >
                                            <Card
                                                style={{
                                                    borderRadius: "25px",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                <CardContent>
                                                    <Box
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            gap: "1rem",
                                                        }}
                                                    >
                                                        <Box style={{ width: "30px", height: "30px" }}>
                                                            <img
                                                                src={
                                                                    channel.channelImage
                                                                        ? channel.channelImage
                                                                        : logo1
                                                                }
                                                                width="100%"
                                                                height="100%"
                                                                alt="Logo"
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography>{channel?.channelName}</Typography>
                                                        </Box>
                                                        <Box>
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                style={{ textTransform: "none" }}
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/channel-details/${channel.channelId}`
                                                                    )
                                                                }
                                                            >
                                                                View details
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    );
                                })}
                    </Box>
                </WidgetWrapper>
            </Box>}
        </>
    );
};

export default ChannelFollowedCardList;
