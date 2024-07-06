import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Button, Divider } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AutoCompleteTextField from "../../components/AutoCompleteTextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CircularProgress from "@mui/material/CircularProgress";
import { setFriends } from "../../state";

const UserSuggestion = ({
  userList,
  userId,
  onClick,
  token,
  setAddFriendLoading,
  addFriendLoading,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [receipantId, setReceipantId] = useState(null);

  const filteredUserList = userList?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(String(value).toLowerCase());
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAddFriendClick = async (id) => {
    setAddFriendLoading(true);
    const rcptId = id ? id : receipantId;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${userId}/${rcptId}`,
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
    setAddFriendLoading(false);
  };

  const handleClose = () => {
    handleAddFriendClick();
    setAnchorEl(null);
  };

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
              Suggestion
            </Typography>
            <AutoCompleteTextField
              userList={userList}
              value={value}
              setValue={setValue}
            />
          </Box>
        </WidgetWrapper>
        <Box
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100%",
            padding: '1rem'
          }}
        >
          {filteredUserList?.length === 0 ? (
            <>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "52vh",
                }}
              >
                <Typography variant="h4" style={{ marginBottom: "1rem" }}>
                  No users found
                </Typography>
              </Box>
            </>
          ) : (
            <>
              {filteredUserList?.map((user) => {
                const userFriend = user.friends.includes(userId);
                return (
                  <>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                        onClick={onClick}
                      >
                        <UserImage image={user?.picturePath} size="25" />
                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        {userFriend ? (
                          <Box style={{ display: "flex", gap: "1rem" }}>
                            <Typography
                              style={{ cursor: "pointer", userSelect: "none" }}
                            >
                              Friend
                            </Typography>
                            <MoreVertRoundedIcon
                              onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setReceipantId(user._id);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            style={{
                              textTransform: "none",
                              background: "#014f86",
                              color: "#ffff",
                              width: "100px",
                            }}
                            onClick={() => handleAddFriendClick(user._id)}
                          >
                            {addFriendLoading ? (
                              <CircularProgress
                                style={{ width: "20px", height: "20px" }}
                              />
                            ) : (
                              `Add Friend`
                            )}
                          </Button>
                        )}
                      </Box>
                    </Box>
                    <Divider />
                  </>
                );
              })}
            </>
          )}
        </Box>
      </Box>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: "15ch",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PersonRemoveIcon />
          <Typography>Unfriend</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserSuggestion;
