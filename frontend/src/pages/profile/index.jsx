import { Box, useMediaQuery, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "./../widgets/UserWidget";
import FriendListWidget from "./../widgets/FriendListWidget";
import MyPostWidget from "./../widgets/MyPostWidget";
import PostsWidget from "./../widgets/PostsWidget";
import Navbar from "./../navbar/index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChangePassword from "./ChangePassword";
import ChangeUserName from "./ChangeUserName";
import ChangeProfileImage from "./ChangeProfileImage";
import WidgetWrapper from "../../components/WidgetWrapper";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isProfileImageChage, setIsProfileImageChange] = useState(false);
  const [isEffect, setIsEffect] = useState(false);

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [isEffect]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} isEffect={isEffect} setIsEffect={setIsEffect} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} isMessageDisplayed={true} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isEffect={isEffect} isProfile />
        </Box>
        {/* Password Change */}
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <WidgetWrapper
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Button
              variant="contained"
              style={{
                background: "#2f6690",
                color: "#ffff",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
              }}
              onClick={() => setIsPasswordChange((preview) => !preview)}
            >
              <Typography
                color={"#ffff"}
                style={{ textDecoration: "none" }}
              >{`Change password`}</Typography>
              {isPasswordChange ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Button>
          </WidgetWrapper>
          {isPasswordChange && (
            <WidgetWrapper>
              <ChangePassword token={token} />
            </WidgetWrapper>
          )}
          {/* Username Change */}
          <WidgetWrapper
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Button
              variant="contained"
              style={{
                background: "#2f6690",
                color: "#ffff",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
              }}
              onClick={() => setIsUserName((preview) => !preview)}
            >
              <Typography
                color={"#ffff"}
                style={{ textDecoration: "none" }}
              >{`Change user name`}</Typography>
              {isUserName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
          </WidgetWrapper>
          {isUserName && (
            <WidgetWrapper>
              <ChangeUserName user={user} setIsEffect={setIsEffect} />
            </WidgetWrapper>
          )}
          {/* Profile image Change */}
          <WidgetWrapper
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Button
              variant="contained"
              style={{
                background: "#2f6690",
                color: "#ffff",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
              }}
              onClick={() => setIsProfileImageChange((preview) => !preview)}
            >
              <Typography
                color={"#ffff"}
                style={{ textDecoration: "none" }}
              >{`Change profile image`}</Typography>
              {isProfileImageChage ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Button>
          </WidgetWrapper>
          {isProfileImageChage && (
            <WidgetWrapper>
              <ChangeProfileImage setIsEffect={setIsEffect} />
            </WidgetWrapper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
