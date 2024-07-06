import React, { useEffect, useState } from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Typography, useTheme, Box, Card, CardContent, Button } from "@mui/material";
import logo1 from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";

const YourChannelCardList = ({ userId, token, isRefresh }) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [channelList, setChannelList] = useState();

    const getChannelList = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/channel/myChannel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setChannelList(data);
    }

    useEffect(() => {
        getChannelList();
    }, [isRefresh]);

    return (
        <>
            {channelList?.length !== 0 && <WidgetWrapper>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{ mb: "1.5rem" }}
                >
                    Your Channel
                </Typography>

                <Box style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
                    {channelList &&
                        channelList?.slice().reverse().map((channel) => {
                            return (
                                <Box
                                    style={{ width: "180px", height: "150px", flex: "1 1 30%" }}
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
                                                    <Button variant="contained" onClick={() => navigate(`/channel-details/${channel.channelId}`)} size="small" style={{ textTransform: 'none' }}>
                                                        View Channel
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            );
                        })}
                </Box>

            </WidgetWrapper>}
        </>
    )
}

export default YourChannelCardList;
