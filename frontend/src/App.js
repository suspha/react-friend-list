import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import FlashNotification from './components/FlashNotification';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import FriendView from './views/FriendView';
import SettingsView from './views/SettingsView';
import CreateFriendView from './views/CreateFriendView';
import EditFriendView from './views/EditFriendView';
import DeleteFriendView from './views/DeleteFriendView';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { AppProvider } from './AppContext';

function App() {
  // Set localstorage when reload
  const theme = localStorage.getItem('theme')
  document.body.classList.add(theme)

  return (
    <Router>
      <AppProvider>
        <div className="App">
          <NavBar />
          <FlashNotification />
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
            <Route path="/settings">
              <SettingsView />
            </Route>
            <Route path="/friend/create">
              <CreateFriendView />
            </Route>
            <Route path="/friend/edit">
              <EditFriendView />
            </Route>
            <Route path="/friend/delete">
              <DeleteFriendView />
            </Route>
          </Switch>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
