import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import FriendView from './views/FriendView';
import {cookie} from './lib/tools';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {

  const isLoggedIn = !!cookie('user')

  const [authenticated, setAuthenticated] = useState(isLoggedIn)

  return (
    <Router>
      <div className="App">
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        <Switch>
        <Route path="/" exact>
            <HomeView />
          </Route>
          <Route path="/login">
            <LoginView setAuthenticated={setAuthenticated}/>
          </Route>
          <Route path="/signup">
            <SignupView />
          </Route>
          <Route path="/friends">
            <FriendView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
