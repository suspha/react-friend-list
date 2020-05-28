import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function App() {
  return (
    <Router>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
