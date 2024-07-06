import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import SendMessageComponent from "./SendMessageComponent";
import CircularProgress from "@mui/material/CircularProgress";
import MessageCardComponent from "./MessageCardComponent";
import { socket } from "../../utils/Socket"
import Scrollbars from "react-custom-scrollbars-2";

const ContentCommunication = ({
    communication,
    token,
    loggedInUser,
    isRefresh,
}) => {
    const scrollbarsRef = useRef(null);
    const [attachment, setAttachment] = React.useState(null);
    const [isTime, setIsTime] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [messages, setMessages] = React.useState(null);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollToBottom();
        }
    };

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.emit("joinRoom", communication.communicationId);
    }, [communication.communicationId, isRefresh]);

    useEffect(() => {
        socket.on("receivePersonalMessage", (data) => {
            setMessages((prevMessages) => {
                if (prevMessages.includes(data.content)) {
                    return prevMessages;
                } else {
                    return [...prevMessages, data.content];
                }
            });
        });
        return () => {
            socket.off("receivePersonalMessage");
        };
    }, []);

    const handleSendMessage = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/communication/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receipantId: communication?.receiptantDetails?._id,
                    content: content,
                }),
            }
        );
        const data = await response.json();
        socket.emit("sendPersonalMessage", {
            conversationId: communication.communicationId,
            userId: loggedInUser._id,
            content: data.content,
        });
        setContent("");
    };

    const getMessage = async () => {
        setIsTime(true);
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/communication/getMessages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    communicationId: communication.communicationId,
                }),
            }
        );
        const data = await response.json();
        setMessages(data);
        setIsTime(false);
    };

    useEffect(() => {
        getMessage();
    }, [isRefresh]);

    return (
        <Box
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            {messages?.length > 0 || !isTime ? (
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    ref={scrollbarsRef}
                >
                    <Box
                        style={{
                            flex: "1 90%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >

                        {messages?.map((message) => {
                            return (
                                <MessageCardComponent
                                    message={message}
                                    receiptantDetails={communication?.receiptantDetails}
                                    loggedInUser={loggedInUser}
                                />
                            );
                        })}
                    </Box>
                </Scrollbars>
            ) : (
                <Box
                    style={{
                        flex: "1 90%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            )
            }

            <Box
                style={{
                    flex: "1 10%",
                    background: "#f6fff8",
                    padding: "1rem",
                    borderRadius: "12px",
                }}
            >
                <SendMessageComponent
                    onChange={(event) => setContent(event.target.value)}
                    value={content || attachment?.name || ""}
                    setAttachment={setAttachment}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    onClick={handleSendMessage}
                />
            </Box>
        </Box >
    );
};

export default ContentCommunication;
