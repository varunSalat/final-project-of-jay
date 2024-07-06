import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import ProfilePage from "./ProfilePage";
import UserSuggestion from "./UserSuggestion";
import ChannelIndex from "../channel/ChannelIndex";
import WidgetWrapper from "../../components/WidgetWrapper";
import FriendRequest from "./FriendRequest";

const UserList = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [userList, setUserList] = useState(null);
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  const [receipantId, setReceipantId] = useState(null);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [userSelect, setUserSelect] = useState(false);

  const getUserList = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUserList(data);
  };

  useEffect(() => {
    getUserList();
  }, [addFriendLoading]);

  return (
    <>
      <Box>
        <Navbar />

        <Box
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            width: "100%",
            justifyContent: "space-between",
            // height: "89.5vh",
          }}
        >
          {/* PROFILE */}
          <Box style={{ width: "100%", flex: 1, height: "100%" }}>
            <ProfilePage
              userId={userId}
              user={user}
              token={token}
              addFriendLoading={addFriendLoading}
              isRefresh={isRefresh}
            />
          </Box>

          {/* USER SUGGESTION */}
          <Box
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <WidgetWrapper>
              <Box style={{ width: "100%", padding: "1rem" }}>
                <ButtonGroup
                  fullWidth
                  disableElevation
                  aria-label="Disabled button group"
                  style={{ textTransform: "none" }}
                >
                  <Button
                    variant="outlined"
                    style={{
                      textTransform: "none",
                      borderColor: userSelect ? "gray" : "none",
                      color: userSelect ? "#e07a5f" : "#ffff",
                      background: userSelect ? "none" : "#1e88e5",
                    }}
                    onClick={() => setUserSelect(false)}
                  >
                    Find more friends
                  </Button>
                  <Button
                    variant="outlined"
                    disabled
                    style={{
                      textTransform: "none",
                      borderColor: userSelect ? "none" : "gray",
                      color: userSelect ? "#ffff" : "#e07a5f",
                      background: userSelect ? "#1e88e5" : "none",
                    }}
                    onClick={() => setUserSelect(true)}
                  >
                    Friend requests
                  </Button>
                </ButtonGroup>
              </Box>
            </WidgetWrapper>
            {!userSelect && (
              <UserSuggestion
                userList={userList}
                userId={userId}
                setReceipantId={setReceipantId}
                receipantId={receipantId}
                setAddFriendLoading={setAddFriendLoading}
                addFriendLoading={addFriendLoading}
                token={token}
              />
            )}

            {userSelect && <FriendRequest />}
          </Box>

          {/* SEARCH USERS */}
          <Box style={{ width: "100%", height: "100%", flex: 1 }}>
            <ChannelIndex isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserList;
