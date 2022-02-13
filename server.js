import { io } from 'socket.io-client';
const URL = 'http://localhost:8000/chats';
export const socketForChats = io(URL, { autoConnect: false });
