import { useState } from 'react'
import { HandleChatMessage } from '../third_party/socketEmiter';

const ChatRoom = (props: any) => {
  const { roomName } = props.match.params;

  const { messages, HandleSendMessage } = HandleChatMessage(roomName);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event: any) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    HandleSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomName}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message: any, i: any) => {
            console.log(message)

            if (message.ownedMessage) {
              return (
                <li
                  key={i}
                  className={`message-item `}
                >
                  <h4> {`${message.username} ${message.message}`} </h4>
                  
                </li>
              )
            }

            return (
              <li
                key={i}
                className={`message-item`}
              >
                {`${message.username} ${message.message}`}
              </li>
            )
          })}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
