import React from "react";
import { Box } from "@mui/material";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import YourChannelCardList from "../channel/YourChannelCardList";

const ProfilePage = ({ userId, user, addFriendLoading, token, isRefresh }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        width: "100%",
      }}
    >
      <Box>
        <UserWidget userId={userId} picturePath={user.picturePath} />
      </Box>
      <Box>
        <FriendListWidget
          userId={userId}
          isMessageDisplayed={true}
          addFriendLoading={addFriendLoading}
        />
      </Box>
      <Box>
        <YourChannelCardList
          userId={userId}
          token={token}
          isRefresh={isRefresh}
        />
      </Box>
    </Box>
  );
};

export default ProfilePage;
