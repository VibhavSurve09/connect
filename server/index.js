const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();
require('dotenv').config();
const PORT = process.env.PORT;
const io = new Server(httpServer, {
  cros: {
    origin: '*',
  },
  /* options */
});
//Domain Hass to be changed in Production
io.engine.on('headers', (headers, req) => {
  headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  headers['Access-Control-Allow-Headers'] =
    'origin, x-requested-with, content-type';
});

const crypto = require('crypto');
const randomId = () => crypto.randomBytes(8).toString('hex');

const { InMemorySessionStore } = require('./sessionStore');
const sessionStore = new InMemorySessionStore();
const { InMemoryMessageStore } = require('./messageStore');
const messageStore = new InMemoryMessageStore();

//Chats Namespace
let activeUsersCount = 0;
const chatsNamespace = io.of('chats');
chatsNamespace.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID != '') {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.uid = session.uid;
      socket.userData = session.userData;
      return next();
    }
  }
  const { userName, auid, photoURL, lastSeen } = socket.handshake.auth;
  if (!(userName && auid)) {
    return next(new Error('Auth Required'));
  }
  socket.userData = { userName, auid, photoURL, lastSeen };
  socket.sessionID = randomId();
  socket.uid = randomId();
  next();
});

chatsNamespace.on('connection', (socket) => {
  activeUsersCount++;
  // persist session
  sessionStore.saveSession(socket.sessionID, {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
  });
  socket.emit('session', { sessionID: socket.sessionID, uid: socket.uid });
  // join the "userID" room
  socket.join(socket.uid);

  const users = [];
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.uid).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.uid === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      uid: session.uid,
      userData: session.userData,
      connected: session.connected,
      messages: messagesPerUser.get(session.uid) || [],
    });
  });

  socket.emit('users', users);
  // notify existing users
  socket.broadcast.emit('user_connected', {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
    messages: [],
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on('private_message', ({ message, to, time }) => {
    const _message = {
      message,
      from: socket.uid,
      to,
      time,
    };
    socket.to(to).to(socket.uid).emit('private_message', _message);
    messageStore.saveMessage(_message);
  });
  socket.on('username_change', ({ chatSession, newData }) => {
    sessionStore.saveSession(chatSession, {
      uid: socket.uid,
      userData: newData,
      connected: false,
    });
  });
  socket.on('disconnect', async () => {
    activeUsersCount--;
    const matchingSockets = await io.in(socket.uid).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit('user_disconnected', socket.uid);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        uid: socket.uid,
        userData: socket.userData,
        connected: false,
      });
    }
    chatsNamespace.emit('active_users_count', { count: activeUsersCount });
  });
  // ...
  chatsNamespace.emit('active_users_count', { count: activeUsersCount });
});

httpServer.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}...`);
});
