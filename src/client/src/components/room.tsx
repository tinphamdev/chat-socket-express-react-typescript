import React, { useState } from "react";
import { Link } from "react-router-dom";
import { emitJoinRoom } from "../third_party/socketEmiter";

const Room = () => {
  const [roomName, setRoomName] = useState('');

  const handleRoomNameChange = (event: any) => {
    setRoomName(event.target.value);
  };

  const handleJoinRoom = (roomName: string) => {
    emitJoinRoom(roomName)
  }

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/rooms/${roomName}`} className="enter-room-button" onClick={() => handleJoinRoom(roomName)}>
        Join room
      </Link>
    </div>
  );
};

export default Room;
