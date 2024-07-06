import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../navbar";
import ChannelOverView from "./ChannelOverView";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChannelDetailsIndex = () => {
    const { id } = useParams();
    const [channelDetails, setChannelDetails] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);
    const isAdmin =
        channelDetails &&
        channelDetails.channelAdmin.some((admin) => admin._id === userId);

    const getChannelDetails = async () => {
        if (id) {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/channel/getChannelById`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ channelId: id }),
                }
            );
            const data = await response.json();
            setChannelDetails(data);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getChannelDetails();
    }, [isRefresh]);

    return (
        <Box>
            <Navbar />
            <Box
                style={{
                    padding: "1rem",
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    style={{
                        height: "100%",
                        width: isNonMobileScreens
                            ? channelDetails?.channelCreatedBy === userId || isAdmin
                                ? "100%"
                                : "50%"
                            : "100%",
                    }}
                >
                    <ChannelOverView
                        channelDetails={channelDetails}
                        userId={userId}
                        isAdmin={isAdmin}
                        setIsRefresh={setIsRefresh}
                        isLoading={isLoading}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ChannelDetailsIndex;
