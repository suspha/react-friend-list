import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import FriendView from './views/FriendView';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { AppProvider } from './AppContext';

function App() {

  return (
    <Router>
      <AppProvider>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <HomeView />
            </Route>
            <Route path="/login">
              <LoginView />
            </Route>
            <Route path="/signup">
              <SignupView />
            </Route>
            <Route path="/friends">
              <FriendView />
            </Route>
          </Switch>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
