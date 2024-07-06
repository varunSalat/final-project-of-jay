import { io } from "socket.io-client";


export let socket;

export function initializeSocket() {
    socket = io(process.env.REACT_APP_SOCKET_URL, {
        transports: ["websocket"]
    });

    socket.on("connect", () => {
        console.log("Connected to server");
    });

    return socket;
}