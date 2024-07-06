import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import WidgetWrapper from "../../components/WidgetWrapper";
import { AiFillMessage } from "react-icons/ai";
import ParticipantCommunication from "./ParticipantCommunication";
import { useSelector } from "react-redux";
import { BiSad } from "react-icons/bi";
import Scrollbars from "react-custom-scrollbars-2";
import UserImage from "../../components/UserImage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCommunication from "./ContentCommunication";
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';

const CommunicationIndex = () => {
  const scrollbarsRef = useRef(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);
  const [participants, setParticipants] = React.useState();
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [communication, setCommunication] = React.useState(null);

  const getParticipants = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/communication/getParticipant`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setParticipants(data);
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "1rem", height: '100vh' }}>
      <Navbar />

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          height: "89vh",
        }}
      >
        {(isNonMobileScreens || !communication) && <WidgetWrapper style={{ flex: "1 10%", height: "100%" }}>
          {participants?.length > 0 ? (
            <Box
              style={{
                flex: "1 10%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <AiFillMessage size={35} />
                <Typography variant="h3" style={{ fontWeight: "bold" }}>
                  Message
                </Typography>
              </Box>
              <Divider style={{ marginTop: "1rem" }} />
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                ref={scrollbarsRef}
                style={{ padding: '1rem' }}
              >
                <Box>
                  {participants?.map((participant) => {
                    return (
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          width: "100%",
                        }}
                      >
                        <ParticipantCommunication
                          receipantName={`${participant.receiptantDetails.firstName} ${participant.receiptantDetails.lastName}`}
                          receipantPicture={
                            participant.receiptantDetails.picturePath
                          }
                          communicationLastDetails={
                            participant.communicationLastDetails
                          }
                          onClick={() => {
                            setCommunication(participant);
                            setIsRefresh((prev) => !prev);
                          }}
                        />
                        <Divider />
                      </Box>
                    );
                  })}
                </Box>
              </Scrollbars>
            </Box>
          ) : (
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiSad size={60} />
              <Typography variant="h5">No Conversations</Typography>
              <Typography color="text.secondary">
                Click 'Message' on another user's profile to start a
                conversation
              </Typography>
            </Box>
          )}
        </WidgetWrapper>}
        {(communication || isNonMobileScreens) && <WidgetWrapper style={{ flex: "1 50%", height: "100%" }}>
          {communication ? (
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <Box
                style={{
                  flex: "1 10%",
                  width: "100%",
                  background: "#f6fff8",
                  padding: "1rem",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#222222",
                }}
              >
                <Box
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <UserImage
                    image={communication.receiptantDetails.picturePath}
                    size="35px"
                  />
                  <Typography variant="h4">{`${communication.receiptantDetails.firstName} ${communication.receiptantDetails.lastName}`}</Typography>
                </Box>
                <Box style={{ display: 'flex', gap: '2rem' }}>
                  <CallIcon
                    onClick={() => alert("Future Enhacement!!!")}
                    style={{ cursor: "pointer" }}
                  />
                  <VideocamIcon
                    onClick={() => alert("Future Enhacement!!!")}
                    style={{ cursor: "pointer" }}
                  />
                  <MoreVertIcon
                    onClick={() => alert("Future Enhacement!!!")}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Box>
              <Box
                style={{
                  flex: "1 90%",
                  width: "100%",
                  background: "#e5e5e5",
                  padding: "1rem",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#222222",
                }}
              >
                <ContentCommunication
                  communication={communication}
                  token={token}
                  loggedInUser={loggedInUser}
                  isRefresh={isRefresh}
                />
              </Box>
            </Box>
          ) : (
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AiFillMessage size={80} />
              <Typography variant="h5">Verma Messenger</Typography>
              <Typography color="text.secondary">
                Privately message other users on Verma
              </Typography>
            </Box>
          )}
        </WidgetWrapper>}
      </Box>
    </Box>
  );
};

export default CommunicationIndex;
