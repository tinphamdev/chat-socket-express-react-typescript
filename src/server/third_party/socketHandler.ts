import { Socket } from 'socket.io'

export const joinRoomHandler = (socket: Socket & { username: string }, roomName: string = 'default') => {
  console.log(`roomName`, roomName)

  try {
    socket.join(roomName)

    console.log(`${socket.username} joined the room ${roomName}`)

    console.log(`${socket.id} joined the room ${roomName}`)

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
      console.log(`${socket.id} joined the room ${roomName}`)

      socket.leave(roomName);
    });
  } catch (error) {
    // todo handle error
    console.log(`Error while joining the room ${roomName} with the err ${error}`)
  }
}
