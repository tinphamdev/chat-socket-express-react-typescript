import { useEffect, useState } from 'react';
import Socket from '../third_party/socketClient'

export const emitJoinRoom = (roomName: string) => {
  console.log(`socket join room`, Socket.id)

  Socket.emit('JOIN_ROOM', roomName)
}

export const HandleChatMessage = (roomId: string) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listens for incoming messages
    Socket.on('NEW_MESSAGE', (message) => {
      const incomingMessage = {
        ...message,
        roomId,
        ownedMessage: message.username === (Socket.auth as any).username,
      };

      setMessages((messages): any => [...messages, incomingMessage]);
    });

    return () => { Socket.disconnect() }
  }, [roomId]);

  const HandleSendMessage = (message: any) => {
    Socket.emit('NEW_MESSAGE', {
      roomId,
      message,
      username: (Socket.auth as any).username,
    });
  };

  return { messages, HandleSendMessage };
};