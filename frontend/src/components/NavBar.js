import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div><Link to="/">Home</Link></div>
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/signup">Signup</Link></div>
      <a href="#">Logout</a>
    </nav>
  );
}

export default NavBar;
