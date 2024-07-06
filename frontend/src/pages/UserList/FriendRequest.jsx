import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import { useSelector } from "react-redux";

const FriendRequest = () => {
    const token = useSelector((state) => state.token);
    const [requestList, setRequestList] = React.useState();

    const getRequestList = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/getFriendRequestList`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        setRequestList(data);
    };

    React.useEffect(() => {
        getRequestList();
    }, []);

    return (
        <Box style={{ width: "100%", height: "100%" }}>
            <Box>
                <WidgetWrapper>
                    <Box
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h2" style={{ flex: 1 }}>
                            Friend Requests
                        </Typography>
                    </Box>
                </WidgetWrapper>
                <Box
                    style={{
                        marginTop: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        height: "100%",
                        padding: "1rem",
                    }}
                >
                    {requestList?.length > 0 ? (
                        <Box>
                            {requestList.map((request) => {
                                return (
                                    <>
                                        <Box
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Box
                                                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                                            >
                                                <UserImage image={request.picturePath} size="35px" />
                                                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                                                    {`${request.firstName} ${request.lastName}`}
                                                </Typography>
                                            </Box>
                                            <Box style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        textTransform: "none",
                                                        background: "#1e88e5",
                                                        color: "#ffff",
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        textTransform: "none",
                                                        background: "#f26a8d",
                                                        color: "#ffff",
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Divider style={{ marginTop: "1rem" }} />
                                    </>
                                )
                            })}
                        </Box>
                    ) : (
                        <Box
                            style={{
                                width: "100%",
                                height: "50vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4" style={{ fontWeight: 'bold' }}>No Friend Request</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default FriendRequest;
