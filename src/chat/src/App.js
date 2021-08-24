import './App.css';
import { io } from 'socket.io-client'
import React, { useState } from 'react';

function App() {
  const [rname, setRname] = useState('main');
  const [username, setUsername] = useState('undefined');
  const [users, setUsers] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('submit')

    // todo: join room.
    const socket = io({
      path: 'ws://localhost:4000',
      autoConnect: true,
      auth: { username },
    })

    socket.connect();

    socket.on('users', (usernames) => {
      setUsers(usernames)
    })
  }

  const renderUsers =  () => {
    var namesList = users.map((name) => {
                    return <li>{name}</li>;
                  })

    return  <ul>{ namesList }</ul>
  }

  return (
    <div className="App">
      <header className="App-header">
        <form action="/chats" onSubmit={handleSubmit}>
          <label htmlFor="lname">Username </label>
          <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} /><br /><br />
          <label htmlFor="lname">Room name </label>
          <input type="text" id="rname" name="rname" value={rname} onChange={e => setRname(e.target.value)} /><br /><br />
          <input type="submit" defaultValue="Submit" />
        </form>
      </header>

      {renderUsers()}
      
    </div>


  );
}


export default App;
