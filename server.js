import { io } from 'socket.io-client';
const URL = process.env.SOCKET_URI;
export const socketForChats = io(URL, { autoConnect: false });
