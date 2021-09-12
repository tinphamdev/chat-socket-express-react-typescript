import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/home';
import Room from './components/room';
import ChatRoom from './components/chatRoom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={Room} />
        <Route exact path="/rooms/:roomName" component={ChatRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

