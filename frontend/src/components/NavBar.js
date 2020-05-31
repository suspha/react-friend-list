import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { cookie } from "../lib/tools";
import { AppContext } from '../AppContext'

function NavBar() {
  const [ authenticated, setAuthenticated ] = useContext(AppContext)

  const history = useHistory()
  function handleLogout(e) {
    e.preventDefault()
    // Delete cookie
    cookie('user', '', -1)
    // Redirect to homepage
    history.push('/')
    setAuthenticated(false)
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
          authenticated && (
            <>
            <li>
              <a href="/logout" onClick={ handleLogout }>Logout</a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </>
          )
        }
        {
          !authenticated && (
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
