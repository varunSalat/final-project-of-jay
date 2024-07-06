import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState } from "react";
import SendMessageFormDialog from "./SendMessageFriend";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  isFriendList,
  isMessageDisplayed,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [isDisplayedForm, setIsDisplayedForm] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              color: palette.primary.dark,
              cursor: "pointer",
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId !== _id && (
        <IconButton
          onClick={() => !isFriendList && patchFriend()}
          sx={{
            backgroundColor: !isFriendList && primaryLight,
            p: !isFriendList && "0.6rem",
          }}
        >
          {isFriend ? (
            <>
              {isFriendList ? (
                <>{isMessageDisplayed && <Button
                  style={{ backgroundColor: "#33658a", color: "#ffff" }}
                  // onClick={() =>
                  //   navigate("/message", { state: { user: isFriend } })
                  // }
                  onClick={() => setIsDisplayedForm(true)}
                  variant="contained"
                >
                  Message
                </Button>}</>
              ) : (
                <PersonRemoveOutlined
                  onClick={() => patchFriend()}
                  sx={{ color: primaryDark }}
                />
              )}
            </>
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
      {isDisplayedForm && <SendMessageFormDialog
        isDisplayedForm={isDisplayedForm}
        setIsDisplayedForm={setIsDisplayedForm}
        friendId={friendId}
        name={name}
        subtitle={subtitle}
        userPicturePath={userPicturePath}
      />
      }
    </FlexBetween>
  );
};

export default Friend;
