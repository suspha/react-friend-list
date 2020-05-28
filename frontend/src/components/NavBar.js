import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul className="nav-home">
        <li>
          <Link to="/">Home</Link>
        </li>        
      </ul>
      <ul className="nav-links">
        <li>
        <Link to="/login">Login</Link>
        </li>
        <li><
          Link to="/signup">Signup</Link>
        </li>
        {/* <li>
           <a href="#">Logout</a> 
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
