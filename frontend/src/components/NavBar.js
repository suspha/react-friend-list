import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { cookie } from "../lib/tools";
import { AppContext } from '../AppContext'

function NavBar() {
  const [ authenticated, setAuthenticated ] = useContext(AppContext)

  const history = useHistory()

  function handleToggleTheme() {
    let theme = localStorage.getItem('theme')
    if(!theme) {
      localStorage.setItem('theme','darkTheme')
      document.body.classList.add('darkTheme')
    } else {
      localStorage.removeItem('theme')
      document.body.classList.remove('darkTheme')
    }
  }

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
        <li>
          <button onClick={ handleToggleTheme }>Toggle theme</button>
        </li>
      </ul>
      <ul className="nav-links">
        {
          authenticated && (
            <>
            <li>
              <Link to="/friends">Friend list</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <a href="/logout" onClick={ handleLogout }>Logout</a>
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
