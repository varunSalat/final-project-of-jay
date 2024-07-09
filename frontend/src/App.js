import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage, LoginPage, ProfilePage, NotFound } from "./pages";
import RootLayout from "./layouts/RootLayout";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UserList from "./pages/UserList/UserList";
import ChannelDetailsIndex from "./pages/channel/channelDetails/ChannelDetailsIndex";
import ChannelContentIndex from "./pages/channel/channelContent/ChannelContentIndex";
import CommunicationIndex from "./pages/communication/CommunicationIndex";
import { initializeSocket } from "./utils/Socket";

const App = () => {
  initializeSocket();
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const [ipAddress, setIpAddress] = useState("");

  const getIpAddress = async () => {
    try {
      const { RTCPeerConnection, RTCSessionDescription } = window;
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(new RTCSessionDescription(offer));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const ipAddressRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
          const match = ipAddressRegex.exec(event.candidate.candidate);
          if (match) {
            setIpAddress(match[1]);
            pc.close();
          }
        }
      };
    } catch (error) {
      console.error("Error getting IP address:", error);
    }
  };

  useEffect(() => {
    getIpAddress();
  }, []);

  console.log("ipAddress", ipAddress);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/message"
          element={isAuth ? <CommunicationIndex /> : <Navigate to="/" />}
        />
        <Route
          path="/userlist"
          element={isAuth ? <UserList /> : <Navigate to="/" />}
        />
        <Route
          path="/channel-details/:id"
          element={isAuth ? <ChannelDetailsIndex /> : <Navigate to="/" />}
        />
        <Route
          path="/channel"
          element={isAuth ? <ChannelContentIndex /> : <Navigate to="/" />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
