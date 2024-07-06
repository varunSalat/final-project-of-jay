import { io } from "socket.io-client";

export let socket;

export const initiateSocketConnection = (user) => {
  socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
    auth: {
      token: user && user,
    },
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
