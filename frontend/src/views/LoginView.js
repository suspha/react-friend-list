import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { cookie, ajax } from "../lib/tools";
import { AppContext } from '../AppContext'

function LoginView() {
  /* eslint-disable no-unused-vars */
  const [ authenticated, setAuthenticated ] = useContext(AppContext)
  const [errors, setErrors] = useState({  email: '', password: '' })
  const [values, setValues] = useState({  email: '', password: ''})
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    // submit to api
    const result = await ajax('/login', values)
    if(result.errors) {
      setErrors(result.errors)
    } else {
      cookie('user', result._id)
      setAuthenticated(true)
      history.push('/friends')
    }
  }

  function updateValue(field, event) {
    setValues({ ...values, [field]: event.target.value })
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="error-msg">{ errors.user }</div>
        <div>
          <label>Email</label><br/>
          <input type="text" name="email" onChange={e => updateValue('email',  e)}/>
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" name="password" onChange={e => updateValue('password',  e)} />
        </div>
        <div className="login-link">Not signed up yet?
          <Link to="/signup"> Signup</Link>
        </div>
        <button className="submit-button">Submit</button>
      </form>
    </>
  );
}

export default LoginView
