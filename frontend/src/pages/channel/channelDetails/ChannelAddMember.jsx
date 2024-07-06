import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Typography } from "@mui/material";
import AutoCompleteTextField from "../../../components/AutoCompleteTextField";
import UserImage from "../../../components/UserImage";

const ChannelAddMember = ({
    channelDetails,
    userId,
    isAdmin,
    setIsRefresh,
}) => {
    const [friends, setFriends] = useState(null);
    const [value, setValue] = useState(null);
    const token = useSelector((state) => state.token);
    const getFriends = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setFriends(data);
        setIsRefresh((isRefresh) => !isRefresh);
    };

    useEffect(() => {
        getFriends();
    }, []);

    const handleAddMember = async (id) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/channel/addMemberChannel`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    channelId: channelDetails.channelId,
                    receipantId: id,
                }),
            }
        );
        await response.json();
        getFriends();
    };

    const handleRemoveMember = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/channel/removeMember`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                channelId: channelDetails.channelId,
                receipantId: id,
            }),
        });
        await response.json();
        getFriends();
    };

    return (
        <Box>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3">Search from your contact list</Typography>
                <AutoCompleteTextField
                    userList={friends}
                    value={value}
                    setValue={setValue}
                />
            </Box>
            <Divider style={{ marginTop: "1rem" }} />
            {friends?.map((response) => {
                const member = channelDetails.channelMembers.some(
                    (filter) => filter._id === response._id
                );
                return (
                    <Box>
                        <Box
                            style={{
                                marginTop: "1rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Box
                                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                            >
                                <UserImage image={response?.picturePath} size="40px" />
                                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                    {`${response?.firstName} ${response?.lastName}`}
                                </Typography>
                            </Box>
                            <Box style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{
                                        textTransform: "none",
                                        background: "#006d77",
                                        color: "#ffff",
                                    }}
                                    onClick={() =>
                                        member
                                            ? handleRemoveMember(response._id)
                                            : handleAddMember(response._id)
                                    }
                                >
                                    {member ? `Remove from channel` : `Add in channel`}
                                </Button>
                            </Box>
                        </Box>
                        <Divider style={{ marginTop: "1rem" }} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default ChannelAddMember;
