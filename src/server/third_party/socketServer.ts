import { Server } from 'http'
import { Server as IOServer, Socket } from 'socket.io'
import { SOCKET_EVENT_ENUM } from './socketEvents'
import { joinRoomHandler } from './socketHandler';

const initServer = (httpServer: Server) => {

  const ioServer = new IOServer(httpServer, {
    allowEIO3: true,
    cors: {
      origin: '*', // public cors
    }
  });

  // middleware
  ioServer.use((socket: Socket & { username: string }, next) => {
    const username = socket.handshake.auth.username;

    if (!username) {
      return next(new Error("invalid username"));
    }

    socket.username = username;

    next();
  });

  ioServer.on("connection", function(socket: Socket & { username: string }) {
    console.log(`${socket.username} connected`);

    socket.on(SOCKET_EVENT_ENUM.JOIN_ROOM, (roomName: string) => joinRoomHandler(socket, roomName))

    socket.on('NEW_MESSAGE', (data) => {
      ioServer.in(data.roomId).emit('NEW_MESSAGE', data);
    });
  });

  return ioServer
}

export default initServer;
