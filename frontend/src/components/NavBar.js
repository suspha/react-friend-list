import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { cookie } from "../lib/tools";

function NavBar(props) {
  const history = useHistory()
  function handleLogout() {
    // Delete cookie
    cookie('user', '', -1)
    // Redirect to homepage
    history.push('/')
    props.setAuthenticated(false)
  }

  return (
    <nav>
      <ul className="nav-home">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul className="nav-links">
        {
          props.authenticated && (
            <>
            <li>
              <button onClick={ handleLogout }>Logout</button>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </>
          )
        }
        {
          !props.authenticated && (
            <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            </>
          )
        }
      </ul>
    </nav>
  );
}

export default NavBar;
