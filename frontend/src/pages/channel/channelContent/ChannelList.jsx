import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import WifiChannelIcon from "@mui/icons-material/WifiChannel";
import logo1 from "../../../assets/logo1.png";
import Badge from "@mui/material/Badge";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import moment from "moment";

const ChannelList = ({ followedChannelList, onClick }) => {
    return (
        <Box>
            <Box style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <WifiChannelIcon style={{ width: "35px", height: "35px" }} />
                <Typography variant="h3" style={{ fontWeight: "bold" }}>
                    Channels
                </Typography>
            </Box>
            <Divider style={{ marginTop: "1rem" }} />
            <Box>
                {followedChannelList &&
                    followedChannelList.map((channel) => {
                        const message = channel?.channelContent?.lastMessage;

                        const maxCharacters = 50; // Maximum characters to display
                        const ellipsis = '...'; // Ellipsis to indicate truncated text

                        let displayMessage = message;

                        if (message && message.length > maxCharacters) {
                            displayMessage = message.substring(0, maxCharacters) + ellipsis;
                        }
                        return (
                            <>
                                <Box
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "1rem",
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => onClick(channel)}
                                >
                                    <Box
                                        style={{
                                            display: "flex",
                                            gap: "1rem",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <img src={logo1} width="100%" height="100%" alt="logo" />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                                {channel?.channelName}
                                            </Typography>
                                            {displayMessage ? <Typography variant="body" style={{ wordWrap: 'nowrap', width: '100%' }}>{displayMessage}</Typography> : <Typography variant="body" style={{ wordWrap: 'nowrap', width: '100%' }}>No content...</Typography>}
                                        </Box>
                                    </Box>
                                    {channel?.channelContent?.timeStamps && <Box style={{ display: "flex", gap: "1rem" }}>
                                        {`${moment(channel?.channelContent?.timeStamps).fromNow()}`}
                                        {channel.channelContent.pendingMessagesLength !== 0 && (
                                            <Badge
                                                badgeContent={
                                                    channel.channelContent.pendingMessagesLength
                                                }
                                                color="primary"
                                            >
                                                <MapsUgcIcon color="action" />
                                            </Badge>
                                        )}
                                    </Box>}
                                </Box>
                                <Divider style={{ marginTop: "1rem" }} />
                            </>
                        );
                    })}
            </Box>
        </Box>
    );
};

export default ChannelList;
