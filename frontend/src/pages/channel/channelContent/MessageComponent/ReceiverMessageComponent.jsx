import { Box, Typography } from "@mui/material";
import React from "react";
import logo1 from "../../../../assets/logo1.png";
import moment from "moment";

const ReceiverMessageComponent = ({ getMessages, userId }) => {
    return (
        <Box
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            {getMessages?.map((message) => {
                return (
                    <Box
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent:
                                message.senderId === userId ? "flex-end" : "flex-start",
                            alignItems: "center",
                        }}
                    >
                        {message.senderId !== userId && (
                            <Box>
                                <Box
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        padding: "2px",
                                    }}
                                >
                                    <img src={logo1} width="100%" height="100%" alt="logo" />
                                </Box>
                            </Box>
                        )}
                        <Box
                            style={{
                                width: "50%",
                                borderRadius:
                                    message.senderId === userId
                                        ? "15px 15px 0 15px"
                                        : "15px 15px 15px 0",
                                padding: "0.5rem",
                                background: message.senderId === userId ? "#adb5bd" : "#caf0f8",
                            }}
                        >
                            <Typography>{message.content}</Typography>
                            <Box
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <Typography>{`${moment(message?.timestamps).fromNow()}`}</Typography>
                            </Box>
                        </Box>
                        {message.senderId === userId && (
                            <Box>
                                <Box
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        padding: "2px",
                                    }}
                                >
                                    <img src={logo1} width="100%" height="100%" alt="logo" />
                                </Box>
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default ReceiverMessageComponent;
