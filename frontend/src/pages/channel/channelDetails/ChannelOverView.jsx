import React from "react";
import { Box, Typography, Button, useMediaQuery, Divider } from "@mui/material";
import WidgetWrapper from "../../../components/WidgetWrapper";
import logo1 from "../../../assets/logo1.png";
import ChannelMenu from "./ChannelMenu";
import ChannelShare from "./ChannelShare";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ChannelPrivacyMore from "./ChannelPrivacyMore";
import LogoutIcon from "@mui/icons-material/Logout";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ChannelAdminList from "./ChannelAdminList";
import ChannelMembersList from "./ChannelMembersList";
import ChannelAddMember from "./ChannelAddMember";
import ChannelEditForm from "./ChannelEditForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChannelOverView = ({ channelDetails, userId, isAdmin, setIsRefresh, isLoading }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [menu, setMenu] = React.useState(null);
  const [privacyOpen, setPrivacyOpen] = React.useState(false);

  const handleUnfollow = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/channel/leaveChannel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelId: id,
      }),
    });
    await response.json();
    navigate("/userlist");
    setIsRefresh((isRefresh) => !isRefresh);
  }

  return (
    <Box
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <WidgetWrapper style={{ height: "100%", flex: "1 30%" }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={logo1}
            width={isNonMobileScreens ? "400px" : "100%"}
            height="100%"
            alt="img"
          />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2">{channelDetails?.channelName}</Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            {channelDetails?.channelDescription}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="h6">{"Total Member:"}</Typography>
          <Typography variant="h6">
            {channelDetails?.channelMembers?.length}
          </Typography>
        </Box>
        <Divider style={{ marginTop: "1rem" }} />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <ChannelShare channelDetails={channelDetails} isAdmin={isAdmin} />
          </Box>
          {isAdmin && (
            <Box style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <ChannelMenu
                channelDetails={channelDetails}
                userId={userId}
                isAdmin={isAdmin}
                setMenu={setMenu}
                token={token}
                setIsRefresh={setIsRefresh}
              />
            </Box>
          )}
        </Box>
        <Divider style={{ marginTop: "1rem" }} />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Typography variant="h5">
            {channelDetails?.privateChannel
              ? "Private Channel"
              : "Public Channel"}
          </Typography>
          <Typography variant="body">
            {channelDetails?.isCommunicateEveryOne
              ? "Everyone can send message"
              : "Only admins can send message"}
          </Typography>
          {channelDetails?.channelCreatedBy === userId ? (
            <Typography variant="body">
              What you share can be seen by everyone except your application.
            </Typography>
          ) : (
            <Typography variant="body">
              Anyone has the ability to discover this channel and view its
              shared content.
            </Typography>
          )}
        </Box>
        <Divider style={{ marginTop: "1rem" }} />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setPrivacyOpen(true)}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GppGoodIcon
              style={{ width: "30px", height: "30px", color: "gray" }}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              style={{ textAlign: "start", width: "100%" }}
            >
              Profile Privacy
            </Typography>
            <Typography>
              This channel has implemented enhanced privacy measures for your
              profile and email address. Click to find out more.
            </Typography>
          </Box>
        </Box>
        <Box>
          <ChannelPrivacyMore
            privacyOpen={privacyOpen}
            setPrivacyOpen={setPrivacyOpen}
          />
        </Box>
        <Divider style={{ marginTop: "1rem" }} />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
            padding: "2rem",
          }}
        >
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <Box
            style={{ display: "flex", gap: "0.5rem", color: "red" }}
          >
            <LogoutIcon />
            <Typography style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleUnfollow(channelDetails.channelId)}>
              Unfollow channel
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <Box
            style={{ display: "flex", gap: "0.5rem", color: "red" }}
            onClick={() => alert("Future Enhancement")}
          >
            <ReportProblemIcon />
            <Typography style={{ fontWeight: "bold", cursor: "pointer" }}>
              Report channel
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="fullWidth" flexItem />
        </Box>
      </WidgetWrapper>

      {(isAdmin || channelDetails?.channelCreatedBy === userId) && (
        <>
          {menu && (
            <WidgetWrapper style={{ height: "100%", flex: "1 30%" }}>
              <Box>
                {menu === "addMember" && (
                  <Typography variant="h3" style={{ fontWeight: "bold" }}>
                    Add Member
                  </Typography>
                )}
                {menu === "editChannel" && (
                  <Typography variant="h3" style={{ fontWeight: "bold" }}>
                    Edit Channel
                  </Typography>
                )}
                {menu === "viewAdmin" && (
                  <Typography variant="h3" style={{ fontWeight: "bold" }}>
                    Admins
                  </Typography>
                )}
                {menu === "viewMember" && (
                  <Typography variant="h3" style={{ fontWeight: "bold" }}>
                    Members
                  </Typography>
                )}
              </Box>

              <Divider style={{ marginTop: "1rem" }} />

              {menu === "viewAdmin" && (
                <Box style={{ marginTop: "1rem" }}>
                  <ChannelAdminList
                    channelDetails={channelDetails}
                    userId={userId}
                    isAdmin={isAdmin}
                    setIsRefresh={setIsRefresh}
                    isLoading={isLoading}
                  />
                </Box>
              )}
              {menu === "viewMember" && (
                <Box style={{ marginTop: "1rem" }}>
                  <ChannelMembersList
                    channelDetails={channelDetails}
                    userId={userId}
                    setIsRefresh={setIsRefresh}
                    isLoading={isLoading}
                  />
                </Box>
              )}

              {menu === "addMember" && (
                <Box style={{ marginTop: "1rem" }}>
                  <ChannelAddMember
                    channelDetails={channelDetails}
                    userId={userId}
                    isAdmin={isAdmin}
                    setIsRefresh={setIsRefresh}
                  />
                </Box>
              )}

              {menu === "editChannel" && (
                <Box style={{ marginTop: "1rem" }}>
                  <ChannelEditForm
                    channelDetails={channelDetails}
                    userId={userId}
                    isAdmin={isAdmin}
                    setIsRefresh={setIsRefresh}
                  />
                </Box>
              )}
            </WidgetWrapper>
          )}
        </>
      )}
    </Box>
  );
};

export default ChannelOverView;
