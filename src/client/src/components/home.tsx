import { useState } from 'react';
import { Link } from 'react-router-dom';
import Socket from '../third_party/socketClient'

const Home = () => {
  const [username, setUsername] = useState('');

  function handleUsernameChange(event: any) {
    setUsername(event.target.value)
  }

  function handleSubmit(event: any) {
    // connect socket
    Socket.auth = { username }
    Socket.connect()

    alert(username + ' connected successfully to socket server')
  }

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        className="text-input-field"
      />
      <Link to="/join" className="enter-room-button" onClick={handleSubmit}>
        OK
      </Link>
    </div>
  );
}

export default Home;
